import { useState, useMemo } from 'react'
import { getAllConcepts } from '../data/conceptDefinitions'

const categories: Record<string, string> = {
  all: 'All',
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

export default function Glossary() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const concepts = useMemo(() => getAllConcepts(), [])

  const filtered = useMemo(() => {
    return concepts
      .filter(c => {
        const matchesSearch = c.displayName.toLowerCase().includes(search.toLowerCase()) ||
          c.shortDefinition.toLowerCase().includes(search.toLowerCase())
        const matchesCat = category === 'all' || c.category === category
        return matchesSearch && matchesCat
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
  }, [concepts, search, category])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Glossary</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {concepts.length} concepts across all chapters
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search concepts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {Object.entries(categories).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map(concept => (
          <div
            key={concept.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{concept.displayName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{concept.shortDefinition}</p>
              </div>
              <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                {categories[concept.category] || concept.category}
              </span>
            </div>
            <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">{concept.content}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8">No concepts match your search.</p>
        )}
      </div>
    </div>
  )
}
