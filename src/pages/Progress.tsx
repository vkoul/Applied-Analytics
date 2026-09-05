import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts'
import { quizData } from '../data/quizData'
import { flashcardData } from '../data/flashcardData'

const chapterIds = ['ch1','ch2','ch3','ch4','ch5','ch6','ch7','ch8','ch9','ch10','ch11','ch12'] as const

const chapterTitles: Record<string, string> = {
  ch1: 'Introduction',
  ch2: 'Linear Models',
  ch3: 'Binary Response',
  ch4: 'Censored Data',
  ch5: 'Count Models',
  ch6: 'Survival Analysis',
  ch7: 'Discrete Choice',
  ch8: 'Instrumental Variables',
  ch9: 'Clustering',
  ch10: 'Text Mining',
  ch11: 'Neural Networks',
  ch12: 'Deep Learning',
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) as T : fallback
  } catch {
    return fallback
  }
}

interface ChapterQuizState {
  answered: number
  correct: number
  total: number
  status: 'not-started' | 'in-progress' | 'completed'
}

function getChapterQuiz(chId: string): ChapterQuizState {
  const questions = quizData[chId] || []
  const answers = readJSON<Record<string, string>>(`aam-quiz-${chId}`, {})
  const answered = Object.keys(answers).length
  const correct = questions.filter(q => answers[q.id] === q.correctId).length
  const total = questions.length
  const status = answered === 0 ? 'not-started' : answered < total ? 'in-progress' : 'completed'
  return { answered, correct, total, status }
}

export default function Progress() {
  const navigate = useNavigate()

  const quizStats = useMemo(() => {
    return chapterIds.map(id => ({ id, ...getChapterQuiz(id) }))
  }, [])

  const flashProgress = useMemo(() => {
    const saved = readJSON<Record<string, 'got-it' | 'review'>>('aam-flashcard-progress', {})
    const mastered = Object.values(saved).filter(v => v === 'got-it').length
    const review = Object.values(saved).filter(v => v === 'review').length
    const total = flashcardData.length
    const notAttempted = total - mastered - review

    const byChapter = chapterIds.map(chId => {
      const chapterCards = flashcardData.filter(f => f.chapter === chId)
      const m = chapterCards.filter(c => saved[c.id] === 'got-it').length
      const r = chapterCards.filter(c => saved[c.id] === 'review').length
      return { chapter: chId.replace('ch', 'Ch'), mastered: m, review: r, remaining: chapterCards.length - m - r }
    })

    return { mastered, review, notAttempted, total, byChapter }
  }, [])

  const quizzesCompleted = quizStats.filter(q => q.status === 'completed').length
  const totalCorrect = quizStats.reduce((s, q) => s + q.correct, 0)
  const totalAnswered = quizStats.reduce((s, q) => s + q.answered, 0)
  const avgScore = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  const statCards = [
    { label: 'Chapters', value: '12', sub: 'total' },
    { label: 'Quizzes Done', value: `${quizzesCompleted}`, sub: 'of 12' },
    { label: 'Quiz Avg', value: `${avgScore}%`, sub: `${totalCorrect}/${totalAnswered} correct` },
    { label: 'Cards Mastered', value: `${flashProgress.mastered}`, sub: `of ${flashProgress.total}` },
  ]

  const statusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-500'
    if (status === 'in-progress') return 'bg-yellow-500'
    return 'bg-gray-300 dark:bg-gray-600'
  }

  const statusLabel = (status: string) => {
    if (status === 'completed') return 'Completed'
    if (status === 'in-progress') return 'In Progress'
    return 'Not Started'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Progress Tracker</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Track your learning across all chapters</p>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {statCards.map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.label}</div>
            <div className="text-xs text-gray-400">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Per-Chapter Quiz Grid */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Chapter Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {quizStats.map(q => (
          <button
            key={q.id}
            onClick={() => navigate(`/${q.id}`)}
            className="text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-white text-sm">
                {q.id.replace('ch', 'Ch ')}: {chapterTitles[q.id]}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                q.status === 'completed'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : q.status === 'in-progress'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}>
                {statusLabel(q.status)}
              </span>
            </div>
            {q.status !== 'not-started' && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Score: {q.correct}/{q.total} ({Math.round((q.correct / q.total) * 100)}%)
              </p>
            )}
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${statusColor(q.status)}`}
                style={{ width: `${q.total > 0 ? (q.answered / q.total) * 100 : 0}%` }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Flashcard Summary */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Flashcard Progress</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">{flashProgress.mastered}</div>
          <div className="text-sm text-green-600 dark:text-green-400">Mastered</div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{flashProgress.review}</div>
          <div className="text-sm text-yellow-600 dark:text-yellow-400">Review</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{flashProgress.notAttempted}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Not Attempted</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Flashcards by Chapter</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={flashProgress.byChapter} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="chapter" tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} allowDecimals={false} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb', fontSize: 12 }} />
            <Bar dataKey="mastered" stackId="a" name="Mastered" fill="#22c55e" radius={[0, 0, 0, 0]} />
            <Bar dataKey="review" stackId="a" name="Review" fill="#eab308" radius={[0, 0, 0, 0]} />
            <Bar dataKey="remaining" stackId="a" name="Remaining" fill="#6b7280" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
