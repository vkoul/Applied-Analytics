import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts'

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function boxMuller(rng: () => number): number {
  const u1 = rng()
  const u2 = rng()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

function buildHistogram(values: number[], min: number, max: number, bins: number) {
  const width = (max - min) / bins
  const counts = Array(bins).fill(0) as number[]
  for (const v of values) {
    const idx = Math.min(Math.floor((v - min) / width), bins - 1)
    if (idx >= 0) counts[idx]++
  }
  return counts.map((c, i) => ({
    bin: Number((min + (i + 0.5) * width).toFixed(1)),
    count: c,
  }))
}

export function CensoringVisualizer() {
  const [censorPt, setCensorPt] = useState(2)
  const n = 300
  const trueBeta = 3
  const trueIntercept = 0

  const { latentHist, observedHist, olsEst, pctCensored } = useMemo(() => {
    const rng = seededRandom(123)
    const latent: number[] = []
    const observed: number[] = []

    for (let i = 0; i < n; i++) {
      const x = rng() * 4 - 1
      const ystar = trueIntercept + trueBeta * x + boxMuller(rng) * 2
      latent.push(ystar)
      observed.push(Math.max(censorPt, ystar))
    }

    const lh = buildHistogram(latent, -8, 16, 24)
    const oh = buildHistogram(observed, -8, 16, 24)

    const xArr = Array.from({ length: n }, (_, i) => {
      const rng2 = seededRandom(123)
      for (let j = 0; j <= i; j++) rng2()
      return rng2() * 4 - 1
    })
    const xBar = xArr.reduce((s, v) => s + v, 0) / n
    const yBar = observed.reduce((s, v) => s + v, 0) / n
    let ssxy = 0, ssxx = 0
    for (let i = 0; i < n; i++) {
      ssxy += (xArr[i] - xBar) * (observed[i] - yBar)
      ssxx += (xArr[i] - xBar) ** 2
    }
    const ols = ssxx > 0 ? ssxy / ssxx : 0
    const censored = observed.filter(v => v === censorPt).length

    return { latentHist: lh, observedHist: oh, olsEst: ols, pctCensored: ((censored / n) * 100).toFixed(0) }
  }, [censorPt])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: Censoring Visualizer</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        As you raise the censoring point, more observations pile up at the boundary. OLS biases toward zero because it treats censored values as real.
      </p>

      <div className="flex flex-wrap gap-6 mb-2">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Censoring point: <span className="font-mono">{censorPt.toFixed(1)}</span>
          <input type="range" min={-2} max={8} step={0.5} value={censorPt}
            onChange={e => setCensorPt(Number(e.target.value))} className="block w-48 mt-1" />
        </label>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <span className="text-gray-600 dark:text-gray-400">True slope: <span className="font-mono text-blue-600 dark:text-blue-400">{trueBeta.toFixed(2)}</span></span>
        <span className="text-gray-600 dark:text-gray-400">OLS estimate: <span className="font-mono text-red-500">{olsEst.toFixed(2)}</span></span>
        <span className="text-gray-600 dark:text-gray-400">Censored: <span className="font-mono">{pctCensored}%</span></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-1">Latent y* (unobserved)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={latentHist} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="bin" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
              <Bar dataKey="count" fill="#3b82f6" fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-1">Observed y (censored at {censorPt.toFixed(1)})</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={observedHist} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="bin" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
              <Bar dataKey="count">
                {observedHist.map((entry, i) => (
                  <Cell key={i} fill={entry.bin <= censorPt + 0.5 ? '#ef4444' : '#10b981'} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
