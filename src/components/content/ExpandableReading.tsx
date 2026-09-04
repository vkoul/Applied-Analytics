import { useState } from 'react'

interface ExpandableReadingProps {
  title: string
  children: React.ReactNode
}

export function ExpandableReading({ title, children }: ExpandableReadingProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors text-left"
      >
        <span className="font-medium text-gray-700 dark:text-gray-300">{title}</span>
        <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="px-4 py-3 text-gray-700 dark:text-gray-300 space-y-3">
          {children}
        </div>
      )}
    </div>
  )
}
