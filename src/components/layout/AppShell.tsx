import { useState, useEffect, type ReactNode } from 'react'
import { SidebarNav } from './SidebarNav'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'
import { SearchModal } from './SearchModal'

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dark, setDark] = useDarkMode()
  const [searchOpen, setSearchOpen] = useState(false)
  useKeyboardNav()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-primary-900 text-white p-4 overflow-y-auto z-40 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-white">Applied Analytics</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white text-xl">&#x2715;</button>
        </div>
        <SidebarNav onClose={() => setSidebarOpen(false)} />
      </aside>
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-3 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 dark:text-gray-300 text-xl">&#x2630;</button>
          <button
            onClick={() => setSearchOpen(true)}
            className="flex-1 max-w-md text-left px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Search... <span className="text-xs text-gray-400 ml-2">Ctrl+K</span>
          </button>
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-lg"
            title="Toggle dark mode"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </header>
        <main className="pb-16">{children}</main>
      </div>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  )
}
