import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ReferenceLine, Tooltip } from 'recharts'

export function LogisticCurveExplorer() {
  const [beta0, setBeta0] = useState(0)
  const [beta1, setBeta1] = useState(1)

  const data = useMemo(() => {
    const points = []
    for (let x = -10; x <= 10; x += 0.5) {
      const p = 1 / (1 + Math.exp(-(beta0 + beta1 * x)))
      points.push({ x: Number(x.toFixed(1)), p: Number(p.toFixed(4)) })
    }
    return points
  }, [beta0, beta1])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: Logistic Curve Explorer</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Adjust the intercept to shift the curve horizontally. Increase the slope to make the decision boundary sharper.
      </p>
      <div className="flex flex-wrap gap-6 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          <span className="block mb-1">&beta;&#8320; (intercept): <span className="font-mono">{beta0.toFixed(1)}</span></span>
          <input type="range" min={-5} max={5} step={0.1} value={beta0}
            onChange={e => setBeta0(Number(e.target.value))}
            className="w-40" />
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300">
          <span className="block mb-1">&beta;&#8321; (slope): <span className="font-mono">{beta1.toFixed(1)}</span></span>
          <input type="range" min={0.1} max={5} step={0.1} value={beta1}
            onChange={e => setBeta1(Number(e.target.value))}
            className="w-40" />
        </label>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="x" tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'X', position: 'insideBottomRight', offset: -5, fill: '#9ca3af' }} />
          <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'P(Y=1)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
          <ReferenceLine y={0.5} stroke="#9ca3af" strokeDasharray="5 5" label={{ value: 'threshold', fill: '#9ca3af', fontSize: 10 }} />
          <Line type="monotone" dataKey="p" stroke="#3b82f6" strokeWidth={2} dot={false} name="P(Y=1)" />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center font-mono">
        P(Y=1|X) = 1 / (1 + exp(-({beta0.toFixed(1)} + {beta1.toFixed(1)}&middot;X)))
      </p>
    </div>
  )
}
