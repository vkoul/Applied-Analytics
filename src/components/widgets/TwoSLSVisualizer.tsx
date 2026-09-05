import { useState, useMemo } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts'

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

function olsFit(xs: number[], ys: number[]) {
  const n = xs.length
  const xBar = xs.reduce((a, b) => a + b, 0) / n
  const yBar = ys.reduce((a, b) => a + b, 0) / n
  let ssxy = 0, ssxx = 0
  for (let i = 0; i < n; i++) {
    ssxy += (xs[i] - xBar) * (ys[i] - yBar)
    ssxx += (xs[i] - xBar) ** 2
  }
  const slope = ssxx > 0 ? ssxy / ssxx : 0
  const intercept = yBar - slope * xBar
  return { slope, intercept }
}

export function TwoSLSVisualizer() {
  const [endoStrength, setEndoStrength] = useState(0.7)
  const [ivStrength, setIvStrength] = useState(0.8)
  const n = 150
  const trueBeta = 2

  const results = useMemo(() => {
    const rng = seededRandom(999)
    const Z: number[] = []
    const eps: number[] = []
    const X: number[] = []
    const Y: number[] = []

    for (let i = 0; i < n; i++) {
      const z = boxMuller(rng) * 2
      const e = boxMuller(rng)
      const v = boxMuller(rng)
      const x = ivStrength * z + Math.sqrt(1 - ivStrength ** 2) * (endoStrength * e + Math.sqrt(1 - endoStrength ** 2) * v)
      const y = 1 + trueBeta * x + e * 2
      Z.push(z); eps.push(e); X.push(x); Y.push(y)
    }

    const olsFitXY = olsFit(X, Y)
    const firstStage = olsFit(Z, X)
    const Xhat = Z.map(z => firstStage.intercept + firstStage.slope * z)
    const twoSLS = olsFit(Xhat, Y)

    const scatterXY = X.map((x, i) => ({ x: Number(x.toFixed(2)), y: Number(Y[i].toFixed(2)) }))
    const scatterZX = Z.map((z, i) => ({ z: Number(z.toFixed(2)), x: Number(X[i].toFixed(2)) }))
    const scatterXhatY = Xhat.map((xh, i) => ({ xhat: Number(xh.toFixed(2)), y: Number(Y[i].toFixed(2)) }))

    return { scatterXY, scatterZX, scatterXhatY, olsSlope: olsFitXY.slope, twoSlsSlope: twoSLS.slope, firstStageSlope: firstStage.slope }
  }, [endoStrength, ivStrength])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: 2SLS Visualizer</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        As endogeneity increases, OLS diverges from the true slope ({trueBeta}). 2SLS recovers it if the instrument is strong enough.
      </p>

      <div className="flex flex-wrap gap-6 mb-2">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Endogeneity: <span className="font-mono">{endoStrength.toFixed(1)}</span>
          <input type="range" min={0} max={0.95} step={0.05} value={endoStrength}
            onChange={e => setEndoStrength(Number(e.target.value))} className="block w-36 mt-1" />
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Instrument strength: <span className="font-mono">{ivStrength.toFixed(1)}</span>
          <input type="range" min={0.1} max={0.95} step={0.05} value={ivStrength}
            onChange={e => setIvStrength(Number(e.target.value))} className="block w-36 mt-1" />
        </label>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <span className="text-gray-600 dark:text-gray-400">True: <span className="font-mono text-green-600 dark:text-green-400">{trueBeta.toFixed(2)}</span></span>
        <span className="text-gray-600 dark:text-gray-400">OLS: <span className="font-mono text-red-500">{results.olsSlope.toFixed(2)}</span></span>
        <span className="text-gray-600 dark:text-gray-400">2SLS: <span className="font-mono text-blue-600 dark:text-blue-400">{results.twoSlsSlope.toFixed(2)}</span></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-1">Y vs X (OLS — biased)</p>
          <ResponsiveContainer width="100%" height={180}>
            <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="x" type="number" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <YAxis dataKey="y" type="number" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
              <Scatter data={results.scatterXY} fill="#ef4444" fillOpacity={0.4} r={2} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-1">X vs Z (First Stage)</p>
          <ResponsiveContainer width="100%" height={180}>
            <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="z" type="number" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <YAxis dataKey="x" type="number" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
              <Scatter data={results.scatterZX} fill="#f59e0b" fillOpacity={0.4} r={2} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-1">Y vs X-hat (2SLS)</p>
          <ResponsiveContainer width="100%" height={180}>
            <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="xhat" type="number" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <YAxis dataKey="y" type="number" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
              <Scatter data={results.scatterXhatY} fill="#3b82f6" fillOpacity={0.4} r={2} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
