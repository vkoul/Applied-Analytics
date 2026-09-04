import { useState, useMemo } from 'react'
import { conceptGraph } from '../data/conceptGraph'
import { getAllConcepts } from '../data/conceptDefinitions'

const categoryColors: Record<string, string> = {
  foundations: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
  linear: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
  binary: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200',
  estimation: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200',
  censored: 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200',
  count: 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200',
  survival: 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200',
  choice: 'bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-200',
  iv: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200',
  clustering: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200',
  text: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200',
  neural: 'bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200',
  deep: 'bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-800 dark:text-fuchsia-200',
}

const categoryLabels: Record<string, string> = {
  foundations: 'Foundations',
  linear: 'Linear Models',
  binary: 'Binary Response',
  estimation: 'Estimation',
  censored: 'Censored Data',
  count: 'Count Data',
  survival: 'Survival',
  choice: 'Discrete Choice',
  iv: 'Instrumental Variables',
  clustering: 'Clustering',
  text: 'Text Mining',
  neural: 'Neural Networks',
  deep: 'Deep Learning',
}

export default function ConceptMap() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const concepts = useMemo(() => getAllConcepts(), [])

  const grouped = useMemo(() => {
    const groups: Record<string, typeof concepts> = {}
    for (const c of concepts) {
      if (selectedCategory !== 'all' && c.category !== selectedCategory) continue
      if (!groups[c.category]) groups[c.category] = []
      groups[c.category].push(c)
    }
    return groups
  }, [concepts, selectedCategory])

  const selected = selectedConcept ? concepts.find(c => c.id === selectedConcept) : null
  const graphNode = selectedConcept ? conceptGraph[selectedConcept] : null
  const dependents = selectedConcept
    ? Object.entries(conceptGraph).filter(([, n]) => n.prerequisites.includes(selectedConcept)).map(([id]) => id)
    : []

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Concept Map</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Explore {Object.keys(conceptGraph).length} concepts and their dependencies
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedCategory === 'all'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCategory === key
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : `${categoryColors[key]} hover:opacity-80`
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {categoryLabels[cat] || cat}
              </h2>
              <div className="flex flex-wrap gap-2">
                {items.sort((a, b) => a.displayName.localeCompare(b.displayName)).map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConcept(c.id === selectedConcept ? null : c.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      c.id === selectedConcept
                        ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                        : graphNode?.prerequisites.includes(c.id)
                          ? 'ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                          : dependents.includes(c.id)
                            ? 'ring-2 ring-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : `${categoryColors[c.category]} hover:opacity-80`
                    }`}
                  >
                    {c.displayName}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          {selected ? (
            <div className="sticky top-20 p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{selected.displayName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selected.shortDefinition}</p>

              {graphNode && graphNode.prerequisites.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                    Prerequisites
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {graphNode.prerequisites.map(pid => {
                      const pc = concepts.find(c => c.id === pid)
                      return (
                        <button
                          key={pid}
                          onClick={() => setSelectedConcept(pid)}
                          className="px-2 py-1 text-xs rounded bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40"
                        >
                          {pc?.displayName || pid}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {dependents.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">
                    Used By
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {dependents.map(did => {
                      const dc = concepts.find(c => c.id === did)
                      return (
                        <button
                          key={did}
                          onClick={() => setSelectedConcept(did)}
                          className="px-2 py-1 text-xs rounded bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40"
                        >
                          {dc?.displayName || did}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                {selected.content}
              </div>
            </div>
          ) : (
            <div className="sticky top-20 p-5 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center text-gray-400">
              Click a concept to see its details and dependencies
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
