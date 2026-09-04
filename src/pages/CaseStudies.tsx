import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { caseStudyData } from '../data/caseStudyData'

const allTags = [...new Set(caseStudyData.map(c => c.violationTag))]

export default function CaseStudies() {
  const [search, setSearch] = useState('')
  const [tag, setTag] = useState('all')
  const navigate = useNavigate()

  const filtered = caseStudyData.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.summary.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
    const matchesTag = tag === 'all' || c.violationTag === tag
    return matchesSearch && matchesTag
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Case Studies</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Real-world examples illustrating key analytics concepts
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search cases..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <select
          value={tag}
          onChange={e => setTag(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Topics</option>
          {allTags.map(t => (
            <option key={t} value={t}>{t.replace(/-/g, ' ')}</option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {filtered.map(cs => (
          <div
            key={cs.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{cs.title}</h3>
                <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                  {cs.year}
                </span>
              </div>
              <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">{cs.company}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{cs.summary}</p>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Key Issue: {cs.violation}
                </p>
              </div>

              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lessons Learned:</h4>
              <ul className="space-y-1">
                {cs.lessonsLearned.map((lesson, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="shrink-0 text-green-500 mt-0.5">-</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate(cs.relatedChapter)}
                className="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                Go to related chapter &rarr;
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8">No case studies match your search.</p>
        )}
      </div>
    </div>
  )
}
