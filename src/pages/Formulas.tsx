import { useState, useMemo, useEffect, useRef } from 'react'
import katex from 'katex'
import { formulaData } from '../data/formulaData'

function RenderedTex({ tex, display = true }: { tex: string; display?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, { displayMode: display, throwOnError: false })
    }
  }, [tex, display])
  return <span ref={ref} />
}

const allCategories = [...new Set(formulaData.map(f => f.category))]

export default function Formulas() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    return formulaData.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase())
      const matchesCat = category === 'all' || f.category === category
      return matchesSearch && matchesCat
    })
  }, [search, category])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Formula Sheet</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {formulaData.length} key equations from the course
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search formulas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Categories</option>
          {allCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map(formula => (
          <div
            key={formula.id}
            className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">{formula.name}</h3>
              <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                {formula.category}
              </span>
            </div>
            <div className="my-3 overflow-x-auto text-center">
              <RenderedTex tex={formula.tex} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{formula.description}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8">No formulas match your search.</p>
        )}
      </div>
    </div>
  )
}
