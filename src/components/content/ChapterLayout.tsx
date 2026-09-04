import { useReadingProgress } from '../../hooks/useReadingProgress'

interface ChapterLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function ChapterLayout({ title, subtitle, children }: ChapterLayoutProps) {
  const progress = useReadingProgress()

  return (
    <article className="max-w-prose mx-auto px-4 py-8">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-primary-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </header>
      <div className="prose-content space-y-4 text-gray-800 dark:text-gray-200 leading-relaxed">
        {children}
      </div>
    </article>
  )
}
