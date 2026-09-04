import { useState, useEffect } from 'react'
import { quizData } from '../../data/quizData'

interface QuizSectionProps {
  chapterId: string
}

export function QuizSection({ chapterId }: QuizSectionProps) {
  const questions = quizData[chapterId] || []
  const storageKey = `aam-quiz-${chapterId}`

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : {}
    } catch { return {} }
  })

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(answers)) } catch {}
  }, [answers, storageKey])

  if (questions.length === 0) return null

  const score = questions.filter(q => answers[q.id] === q.correctId).length

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Chapter Quiz
        {Object.keys(answers).length === questions.length && (
          <span className="ml-3 text-base font-normal text-gray-500">
            Score: {score}/{questions.length}
          </span>
        )}
      </h2>
      <div className="space-y-6">
        {questions.map((q, qi) => {
          const answered = answers[q.id] !== undefined
          const correct = answers[q.id] === q.correctId
          return (
            <div key={q.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                {qi + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map(opt => {
                  const isSelected = answers[q.id] === opt.id
                  const isCorrect = opt.id === q.correctId
                  let bg = 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
                  if (answered && isCorrect) bg = 'bg-green-50 dark:bg-green-900/30 border-green-500'
                  else if (answered && isSelected && !isCorrect) bg = 'bg-red-50 dark:bg-red-900/30 border-red-400'
                  return (
                    <button
                      key={opt.id}
                      onClick={() => !answered && setAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                      disabled={answered}
                      className={`w-full text-left p-3 rounded border transition-colors ${bg} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className="text-gray-700 dark:text-gray-300">{opt.text}</span>
                    </button>
                  )
                })}
              </div>
              {answered && (
                <p className={`mt-3 text-sm ${correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {q.explanation}
                </p>
              )}
            </div>
          )
        })}
      </div>
      {Object.keys(answers).length > 0 && (
        <button
          onClick={() => setAnswers({})}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
        >
          Reset Quiz
        </button>
      )}
    </div>
  )
}
