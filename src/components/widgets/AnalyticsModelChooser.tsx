import { useState } from 'react'

interface NodeOption {
  label: string
  next?: string
  result?: { model: string; chapter: string; description: string }
}

interface Node {
  question: string
  options: NodeOption[]
}

const tree: Record<string, Node> = {
  start: {
    question: 'What type is your response variable?',
    options: [
      { label: 'Continuous (unbounded)', next: 'continuous' },
      { label: 'Binary (yes/no)', result: { model: 'Logistic Regression', chapter: '/ch3', description: 'Use logistic or probit regression for binary outcomes.' } },
      { label: 'Count (0, 1, 2, ...)', next: 'count' },
      { label: 'Time-to-event', result: { model: 'Survival Analysis', chapter: '/ch6', description: 'Use Kaplan-Meier or Cox PH for duration data with censoring.' } },
      { label: 'Categorical (3+ unordered)', result: { model: 'Multinomial Logit', chapter: '/ch7', description: 'Use MNL, nested logit, or mixed logit for multi-category choice.' } },
    ],
  },
  continuous: {
    question: 'Is your response variable censored (e.g., bounded at 0)?',
    options: [
      { label: 'No — fully observed', next: 'continuous_endo' },
      { label: 'Yes — censored at a boundary', result: { model: 'Tobit Model', chapter: '/ch4', description: 'Use Tobit for censored continuous data (e.g., spending with zeros).' } },
    ],
  },
  continuous_endo: {
    question: 'Are your explanatory variables exogenous (no omitted variable bias)?',
    options: [
      { label: 'Yes — standard assumptions hold', result: { model: 'OLS Regression', chapter: '/ch2', description: 'OLS is BLUE under Gauss-Markov assumptions.' } },
      { label: 'No — endogeneity suspected', result: { model: 'Instrumental Variables (2SLS)', chapter: '/ch8', description: 'Use 2SLS with valid instruments to get consistent estimates.' } },
    ],
  },
  count: {
    question: 'Is there overdispersion (variance > mean)?',
    options: [
      { label: 'No — variance ≈ mean', result: { model: 'Poisson Regression', chapter: '/ch5', description: 'Poisson regression with log link for equidispersed counts.' } },
      { label: 'Yes — variance >> mean', next: 'count_zeros' },
    ],
  },
  count_zeros: {
    question: 'Are there excess zeros beyond what the model predicts?',
    options: [
      { label: 'No — just overdispersion', result: { model: 'Negative Binomial', chapter: '/ch5', description: 'NB adds a dispersion parameter to handle overdispersion.' } },
      { label: 'Yes — many structural zeros', result: { model: 'Zero-Inflated Model', chapter: '/ch5', description: 'ZIP or ZINB separates the zero-generating process from the count process.' } },
    ],
  },
}

export function AnalyticsModelChooser() {
  const [path, setPath] = useState<string[]>(['start'])
  const currentId = path[path.length - 1]
  const current = tree[currentId]
  const [result, setResult] = useState<{ model: string; chapter: string; description: string } | null>(null)

  const handleChoice = (opt: NodeOption) => {
    if (opt.result) {
      setResult(opt.result)
    } else if (opt.next) {
      setPath(prev => [...prev, opt.next!])
    }
  }

  const reset = () => { setPath(['start']); setResult(null) }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: Model Chooser</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Answer questions about your data to find the right model.
      </p>

      {!result && current && (
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-3">{current.question}</p>
          <div className="space-y-2">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleChoice(opt)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-gray-700 dark:text-gray-300"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {path.length > 1 && (
            <button onClick={() => setPath(prev => prev.slice(0, -1))} className="mt-3 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline">
              Back
            </button>
          )}
        </div>
      )}

      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 text-lg">{result.model}</h4>
          <p className="text-green-700 dark:text-green-300 mt-1">{result.description}</p>
          <div className="mt-3 flex gap-3">
            <a href={`#${result.chapter}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Go to chapter
            </a>
            <button onClick={reset} className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline">
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
