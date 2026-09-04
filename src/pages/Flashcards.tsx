import { useState, useMemo, useEffect } from 'react'
import { flashcardData } from '../data/flashcardData'

const chapters = [...new Set(flashcardData.map(f => f.chapter))].sort()

export default function Flashcards() {
  const [chapter, setChapter] = useState('all')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [progress, setProgress] = useState<Record<string, 'got-it' | 'review'>>(() => {
    try {
      const saved = localStorage.getItem('aam-flashcard-progress')
      return saved ? JSON.parse(saved) : {}
    } catch { return {} }
  })

  useEffect(() => {
    try { localStorage.setItem('aam-flashcard-progress', JSON.stringify(progress)) } catch {}
  }, [progress])

  const cards = useMemo(() => {
    return chapter === 'all'
      ? flashcardData
      : flashcardData.filter(f => f.chapter === chapter)
  }, [chapter])

  const card = cards[index]
  const gotIt = Object.values(progress).filter(v => v === 'got-it').length
  const review = Object.values(progress).filter(v => v === 'review').length

  const next = () => { setFlipped(false); setIndex(i => (i + 1) % cards.length) }
  const prev = () => { setFlipped(false); setIndex(i => (i - 1 + cards.length) % cards.length) }
  const markCard = (status: 'got-it' | 'review') => {
    if (card) setProgress(p => ({ ...p, [card.id]: status }))
    next()
  }

  if (!card) return <div className="p-8 text-gray-400">No flashcards available.</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Flashcards</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {flashcardData.length} cards | {gotIt} mastered | {review} to review
      </p>

      <div className="flex gap-3 mb-6">
        <select
          value={chapter}
          onChange={e => { setChapter(e.target.value); setIndex(0); setFlipped(false) }}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Chapters</option>
          {chapters.map(ch => (
            <option key={ch} value={ch}>{ch.toUpperCase()}</option>
          ))}
        </select>
        <button
          onClick={() => { setProgress({}); setIndex(0); setFlipped(false) }}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
        >
          Reset Progress
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        Card {index + 1} of {cards.length}
        {progress[card.id] && (
          <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
            progress[card.id] === 'got-it'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
          }`}>
            {progress[card.id] === 'got-it' ? 'Mastered' : 'Review'}
          </span>
        )}
      </div>

      <div
        className="relative cursor-pointer select-none"
        onClick={() => setFlipped(!flipped)}
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '200px',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white dark:bg-gray-800 border-2 border-primary-200 dark:border-primary-800 rounded-xl p-8 flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-lg text-gray-800 dark:text-gray-200 text-center">{card.front}</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-300 dark:border-primary-700 rounded-xl p-8 flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-gray-700 dark:text-gray-300 text-center">{card.back}</p>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">Click to flip</p>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prev}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          Previous
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => markCard('review')}
            className="px-4 py-2 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50"
          >
            Review Again
          </button>
          <button
            onClick={() => markCard('got-it')}
            className="px-4 py-2 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50"
          >
            Got It
          </button>
        </div>
        <button
          onClick={next}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}
