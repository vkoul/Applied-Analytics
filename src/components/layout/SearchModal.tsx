import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchIndex } from '../../data/searchIndex'

export function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = query.length > 1
    ? searchIndex.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12)
    : []

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { setSelected(0) }, [query])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault() }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const go = (path: string) => { navigate(path); onClose() }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && results[selected]) go(results[selected].path)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[20vh]" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search chapters, concepts, formulas..."
          className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white text-lg outline-none border-b border-gray-200 dark:border-gray-700"
        />
        {results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map((item, i) => (
              <li key={item.path + item.title}>
                <button
                  onClick={() => go(item.path)}
                  className={`w-full text-left px-4 py-2 flex items-center gap-3 ${
                    i === selected ? 'bg-primary-50 dark:bg-primary-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xs font-medium text-gray-400 uppercase w-16">{item.type}</span>
                  <span className="text-gray-800 dark:text-gray-200">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {query.length > 1 && results.length === 0 && (
          <p className="px-4 py-6 text-center text-gray-400">No results found</p>
        )}
      </div>
    </div>
  )
}
