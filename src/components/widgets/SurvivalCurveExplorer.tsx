import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ReferenceLine, Tooltip } from 'recharts'

export function SurvivalCurveExplorer() {
  const [lambda, setLambda] = useState(0.1)
  const [model, setModel] = useState<'exponential' | 'weibull'>('exponential')
  const [kShape, setKShape] = useState(1.5)

  const data = useMemo(() => {
    const points = []
    for (let t = 0; t <= 20; t += 0.25) {
      let s: number
      if (model === 'exponential') {
        s = Math.exp(-lambda * t)
      } else {
        s = Math.exp(-Math.pow(lambda * t, kShape))
      }
      points.push({ t: Number(t.toFixed(2)), s: Number(s.toFixed(6)) })
    }
    return points
  }, [lambda, model, kShape])

  const medianSurvival = useMemo(() => {
    if (model === 'exponential') {
      return Math.log(2) / lambda
    }
    return Math.pow(Math.log(2), 1 / kShape) / lambda
  }, [lambda, model, kShape])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: Survival Curve Explorer</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        A constant hazard (exponential) gives a memoryless process. With Weibull,
        k&lt;1 means decreasing hazard (infant mortality), k&gt;1 means increasing hazard (aging).
      </p>

      <div className="flex flex-wrap items-start gap-6 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          <span className="block mb-1">&lambda; (hazard rate): <span className="font-mono">{lambda.toFixed(2)}</span></span>
          <input type="range" min={0.01} max={0.5} step={0.01} value={lambda}
            onChange={e => setLambda(Number(e.target.value))}
            className="w-40" />
        </label>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <span className="block mb-1">Model:</span>
          <div className="flex gap-3">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="surv-model" checked={model === 'exponential'}
                onChange={() => setModel('exponential')} />
              Exponential
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="surv-model" checked={model === 'weibull'}
                onChange={() => setModel('weibull')} />
              Weibull
            </label>
          </div>
        </div>
        {model === 'weibull' && (
          <label className="text-sm text-gray-700 dark:text-gray-300">
            <span className="block mb-1">k (shape): <span className="font-mono">{kShape.toFixed(1)}</span></span>
            <input type="range" min={0.5} max={3} step={0.1} value={kShape}
              onChange={e => setKShape(Number(e.target.value))}
              className="w-40" />
          </label>
        )}
      </div>

      <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
        Median survival time: <span className="font-mono font-medium">{medianSurvival > 20 ? '>20' : medianSurvival.toFixed(2)}</span>
        {model === 'weibull' && (
          <span className="ml-3">
            Hazard is {kShape < 1 ? 'decreasing (infant mortality)' : kShape > 1 ? 'increasing (aging/wear-out)' : 'constant'}
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'Time (t)', position: 'insideBottomRight', offset: -5, fill: '#9ca3af' }} />
          <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'S(t)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
          <ReferenceLine y={0.5} stroke="#9ca3af" strokeDasharray="5 5" label={{ value: 'median', fill: '#9ca3af', fontSize: 10 }} />
          {medianSurvival <= 20 && (
            <ReferenceLine x={Number(medianSurvival.toFixed(2))} stroke="#ef4444" strokeDasharray="5 5" />
          )}
          <Line type="monotone" dataKey="s" stroke="#3b82f6" strokeWidth={2} dot={false} name="S(t)" />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center font-mono">
        {model === 'exponential'
          ? `S(t) = exp(-${lambda.toFixed(2)} · t)`
          : `S(t) = exp(-(${lambda.toFixed(2)} · t)^${kShape.toFixed(1)})`}
      </p>
    </div>
  )
}
