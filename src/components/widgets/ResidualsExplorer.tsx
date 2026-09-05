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

export function ResidualsExplorer() {
  const [n, setN] = useState(60)
  const [noise, setNoise] = useState(1)
  const [hetero, setHetero] = useState(false)

  const { scatter, residuals, beta0, beta1 } = useMemo(() => {
    const rng = seededRandom(42)
    const trueBeta0 = 2
    const trueBeta1 = 1.5
    const points: { x: number; y: number }[] = []

    for (let i = 0; i < n; i++) {
      const x = rng() * 10
      const sd = hetero ? noise * (0.3 + 0.3 * x) : noise
      const eps = boxMuller(rng) * sd
      const y = trueBeta0 + trueBeta1 * x + eps
      points.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) })
    }

    const xBar = points.reduce((s, p) => s + p.x, 0) / n
    const yBar = points.reduce((s, p) => s + p.y, 0) / n
    let ssxy = 0, ssxx = 0
    for (const p of points) {
      ssxy += (p.x - xBar) * (p.y - yBar)
      ssxx += (p.x - xBar) ** 2
    }
    const b1 = ssxx > 0 ? ssxy / ssxx : 0
    const b0 = yBar - b1 * xBar

    const resid = points.map(p => {
      const fitted = b0 + b1 * p.x
      return { fitted: Number(fitted.toFixed(2)), residual: Number((p.y - fitted).toFixed(2)) }
    })

    return { scatter: points, residuals: resid, beta0: b0, beta1: b1 }
  }, [n, noise, hetero])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: Residuals Explorer</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        With homoscedastic errors, residuals show no pattern. Toggle heteroscedasticity to see the classic fan shape.
      </p>

      <div className="flex flex-wrap gap-6 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          n = <span className="font-mono">{n}</span>
          <input type="range" min={20} max={200} step={10} value={n}
            onChange={e => setN(Number(e.target.value))} className="block w-36 mt-1" />
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Noise = <span className="font-mono">{noise.toFixed(1)}</span>
          <input type="range" min={0.2} max={3} step={0.2} value={noise}
            onChange={e => setNoise(Number(e.target.value))} className="block w-36 mt-1" />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input type="checkbox" checked={hetero} onChange={e => setHetero(e.target.checked)}
            className="rounded" />
          Heteroscedasticity
        </label>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        OLS fit: Y = {beta0.toFixed(2)} + {beta1.toFixed(2)}X
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-1">Y vs X with fitted line</p>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="x" type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} name="X" />
              <YAxis dataKey="y" type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} name="Y" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
              <Scatter data={scatter} fill="#3b82f6" fillOpacity={0.6} r={3} />
              <ReferenceLine
                segment={[
                  { x: 0, y: beta0 },
                  { x: 10, y: beta0 + beta1 * 10 },
                ]}
                stroke="#ef4444" strokeWidth={2}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-1">Residuals vs Fitted</p>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="fitted" type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} name="Fitted" />
              <YAxis dataKey="residual" type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} name="Residual" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
              <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="5 5" />
              <Scatter data={residuals} fill="#10b981" fillOpacity={0.6} r={3} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
