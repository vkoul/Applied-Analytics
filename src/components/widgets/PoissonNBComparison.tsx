import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts'

function logGamma(z: number): number {
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z)
  }
  z -= 1
  const g = 7
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ]
  let x = c[0]
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i)
  const t = z + g + 0.5
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x)
}

function poissonPMF(k: number, lambda: number): number {
  return Math.exp(-lambda + k * Math.log(lambda) - logGamma(k + 1))
}

function nbPMF(k: number, lambda: number, alpha: number): number {
  if (alpha <= 0.001) return poissonPMF(k, lambda)
  const r = 1 / alpha
  const p = r / (r + lambda)
  return Math.exp(
    logGamma(k + r) - logGamma(r) - logGamma(k + 1) +
    r * Math.log(p) + k * Math.log(1 - p)
  )
}

export function PoissonNBComparison() {
  const [lambda, setLambda] = useState(5)
  const [alpha, setAlpha] = useState(0)

  const data = useMemo(() => {
    const maxK = Math.min(30, Math.max(20, Math.ceil(lambda * 3)))
    const points = []
    for (let k = 0; k <= maxK; k++) {
      points.push({
        k,
        poisson: Number(poissonPMF(k, lambda).toFixed(6)),
        nb: Number(nbPMF(k, lambda, alpha).toFixed(6)),
      })
    }
    return points
  }, [lambda, alpha])

  const poissonVar = lambda
  const nbVar = lambda + alpha * lambda * lambda

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: Poisson vs Negative Binomial</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        When &alpha; = 0, both distributions are identical. Increase &alpha; to see how the NB spreads out &mdash; this is overdispersion.
      </p>
      <div className="flex flex-wrap gap-6 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          <span className="block mb-1">&lambda; (mean): <span className="font-mono">{lambda}</span></span>
          <input type="range" min={1} max={20} step={1} value={lambda}
            onChange={e => setLambda(Number(e.target.value))}
            className="w-40" />
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300">
          <span className="block mb-1">&alpha; (overdispersion): <span className="font-mono">{alpha.toFixed(2)}</span></span>
          <input type="range" min={0} max={2} step={0.05} value={alpha}
            onChange={e => setAlpha(Number(e.target.value))}
            className="w-40" />
        </label>
      </div>

      <div className="flex gap-6 text-xs mb-3 text-gray-600 dark:text-gray-400">
        <span>Poisson: Mean = {lambda}, Var = <span className="font-mono">{poissonVar.toFixed(1)}</span></span>
        <span>NB: Mean = {lambda}, Var = <span className="font-mono">{nbVar.toFixed(1)}</span></span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="k" tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'k', position: 'insideBottomRight', offset: -5, fill: '#9ca3af' }} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'P(Y=k)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="poisson" fill="#3b82f6" opacity={0.7} name="Poisson" />
          <Bar dataKey="nb" fill="#ef4444" opacity={0.7} name="Neg. Binomial" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
