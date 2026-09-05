import { useState } from 'react'

interface CodeBlockProps {
  python: string
  r: string
  title?: string
}

export function CodeBlock({ python, r, title }: CodeBlockProps) {
  const [lang, setLang] = useState<'python' | 'r'>('python')
  const [copied, setCopied] = useState(false)
  const code = lang === 'python' ? python : r

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1">
          {title && <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">{title}</span>}
          <button
            onClick={() => setLang('python')}
            className={`px-2 py-1 text-xs rounded ${lang === 'python' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-medium' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Python
          </button>
          <button
            onClick={() => setLang('r')}
            className={`px-2 py-1 text-xs rounded ${lang === 'r' ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-medium' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            R
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}
