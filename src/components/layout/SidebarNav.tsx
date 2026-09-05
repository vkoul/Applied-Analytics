import { NavLink } from 'react-router-dom'

const chapters = [
  { path: '/ch1', label: 'Ch 1: Introduction' },
  { path: '/ch2', label: 'Ch 2: Linear Models' },
  { path: '/ch3', label: 'Ch 3: Binary Response' },
  { path: '/ch4', label: 'Ch 4: Censored Data' },
  { path: '/ch5', label: 'Ch 5: Count Models' },
  { path: '/ch6', label: 'Ch 6: Survival Analysis' },
  { path: '/ch7', label: 'Ch 7: Discrete Choice' },
  { path: '/ch8', label: 'Ch 8: Instrumental Variables' },
  { path: '/ch9', label: 'Ch 9: Clustering' },
  { path: '/ch10', label: 'Ch 10: Text Mining' },
  { path: '/ch11', label: 'Ch 11: Neural Networks' },
  { path: '/ch12', label: 'Ch 12: Deep Learning' },
]

const resources = [
  { path: '/glossary', label: 'Glossary' },
  { path: '/formulas', label: 'Formula Sheet' },
  { path: '/flashcards', label: 'Flashcards' },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/map', label: 'Concept Map' },
  { path: '/progress', label: 'Progress' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-1.5 rounded text-sm transition-colors ${
    isActive
      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 font-medium'
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
  }`

export function SidebarNav({ onClose }: { onClose?: () => void }) {
  return (
    <nav className="space-y-6">
      <div>
        <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Chapters</h3>
        <ul className="space-y-0.5">
          {chapters.map(ch => (
            <li key={ch.path}>
              <NavLink to={ch.path} className={linkClass} onClick={onClose}>{ch.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Resources</h3>
        <ul className="space-y-0.5">
          {resources.map(r => (
            <li key={r.path}>
              <NavLink to={r.path} className={linkClass} onClick={onClose}>{r.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
