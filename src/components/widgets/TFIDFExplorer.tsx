import { useState, useMemo } from 'react'

const presets: Record<string, string[]> = {
  'Food reviews': [
    'The pizza was delicious and the crust was perfectly crispy',
    'The sushi was fresh and the fish melted in my mouth',
    'The burger was greasy but the fries were perfectly salted',
  ],
  'Tech articles': [
    'Machine learning algorithms train neural networks on large datasets',
    'Cloud computing enables scalable deployment of web applications',
    'Cybersecurity threats require encryption and authentication protocols',
  ],
  'Sports news': [
    'The quarterback threw three touchdown passes in the fourth quarter',
    'The goalkeeper saved a penalty kick in the championship final',
    'The sprinter broke the world record in the hundred meter dash',
  ],
}

function tokenize(text: string): string[] {
  const stops = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'is', 'was', 'were', 'are', 'be', 'been'])
  return text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 1 && !stops.has(w))
}

function computeTFIDF(docs: string[]) {
  const tokenized = docs.map(tokenize)
  const allTerms = [...new Set(tokenized.flat())].sort()
  const N = docs.length

  const df: Record<string, number> = {}
  for (const t of allTerms) {
    df[t] = tokenized.filter(doc => doc.includes(t)).length
  }

  const matrix: { term: string; scores: number[] }[] = []
  for (const term of allTerms) {
    const idf = Math.log(N / df[term])
    const scores = tokenized.map(tokens => {
      const tf = tokens.filter(t => t === term).length / tokens.length
      return Number((tf * idf).toFixed(3))
    })
    if (scores.some(s => s > 0)) {
      matrix.push({ term, scores })
    }
  }

  matrix.sort((a, b) => {
    const maxA = Math.max(...a.scores)
    const maxB = Math.max(...b.scores)
    return maxB - maxA
  })

  return matrix
}

function heatColor(value: number, max: number): string {
  if (max === 0 || value === 0) return 'transparent'
  const intensity = Math.min(value / max, 1)
  const r = Math.round(59 + (59 - 59) * intensity)
  const g = Math.round(130 - 60 * intensity)
  const b = Math.round(246)
  return `rgba(${r}, ${g}, ${b}, ${(0.15 + 0.65 * intensity).toFixed(2)})`
}

export function TFIDFExplorer() {
  const [presetKey, setPresetKey] = useState('Food reviews')
  const docs = presets[presetKey]

  const matrix = useMemo(() => computeTFIDF(docs), [docs])
  const globalMax = Math.max(...matrix.flatMap(r => r.scores))

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: TF-IDF Explorer</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Terms common across all documents get low IDF. Terms unique to one document get high TF-IDF — these are the distinguishing features.
      </p>

      <div className="mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300 mr-2">Document set:</label>
        {Object.keys(presets).map(key => (
          <button
            key={key}
            onClick={() => setPresetKey(key)}
            className={`px-3 py-1 mr-2 text-sm rounded-lg transition-colors ${
              presetKey === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="mb-4 space-y-1">
        {docs.map((d, i) => (
          <p key={i} className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Doc {i + 1}:</span> {d}
          </p>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 border-b-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Term</th>
              {docs.map((_, i) => (
                <th key={i} className="text-center p-2 border-b-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Doc {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.slice(0, 20).map(row => (
              <tr key={row.term} className="border-b border-gray-100 dark:border-gray-700">
                <td className="p-2 font-mono text-xs text-gray-800 dark:text-gray-200">{row.term}</td>
                {row.scores.map((score, i) => (
                  <td
                    key={i}
                    className="p-2 text-center font-mono text-xs"
                    style={{ backgroundColor: heatColor(score, globalMax), color: score > globalMax * 0.5 ? '#fff' : undefined }}
                  >
                    {score > 0 ? score.toFixed(3) : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {matrix.length > 20 && (
        <p className="text-xs text-gray-400 mt-2">Showing top 20 of {matrix.length} terms by max TF-IDF</p>
      )}
    </div>
  )
}
