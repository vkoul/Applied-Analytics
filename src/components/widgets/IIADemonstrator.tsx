import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b']

interface Shares { name: string; share: number }

const initial: Shares[] = [
  { name: 'Car', share: 50 },
  { name: 'Red Bus', share: 50 },
]

const mnlAfter: Shares[] = [
  { name: 'Car', share: 33.3 },
  { name: 'Red Bus', share: 33.3 },
  { name: 'Blue Bus', share: 33.3 },
]

const nestedAfter: Shares[] = [
  { name: 'Car', share: 50 },
  { name: 'Red Bus', share: 25 },
  { name: 'Blue Bus', share: 25 },
]

export function IIADemonstrator() {
  const [added, setAdded] = useState(false)
  const [model, setModel] = useState<'mnl' | 'nested'>('mnl')

  const data = !added ? initial : model === 'mnl' ? mnlAfter : nestedAfter

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: Red Bus / Blue Bus (IIA)</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        MNL's IIA property forces proportional substitution. Nested logit allows Blue Bus to steal mostly from Red Bus.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        {!added ? (
          <button
            onClick={() => setAdded(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Blue Bus
          </button>
        ) : (
          <>
            <button
              onClick={() => setModel('mnl')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                model === 'mnl'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              MNL Prediction
            </button>
            <button
              onClick={() => setModel('nested')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                model === 'nested'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Nested Logit (Correct)
            </button>
            <button
              onClick={() => { setAdded(false); setModel('mnl') }}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
            >
              Reset
            </button>
          </>
        )}
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
          <YAxis domain={[0, 60]} tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'Market Share (%)', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} formatter={(v: number | string) => `${Number(v).toFixed(1)}%`} />
          <Legend />
          <Bar dataKey="share" name="Share (%)" animationDuration={600}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {added && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          {model === 'mnl'
            ? 'MNL reduces all alternatives proportionally (IIA) — Car drops from 50% to 33%, which is unrealistic.'
            : 'Nested logit groups Red Bus and Blue Bus together — Car keeps 50%, buses split the other 50%.'}
        </p>
      )}
    </div>
  )
}
