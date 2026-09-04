import { useState } from 'react'

interface Choice {
  label: string
  explanation: string
  isRecommended: boolean
}

interface DecisionScenarioProps {
  scenario: string
  choices: Choice[]
}

export function DecisionScenario({ scenario, choices }: DecisionScenarioProps) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="my-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5">
      <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Decision Scenario</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{scenario}</p>
      <div className="space-y-3">
        {choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selected === i
                ? choice.isRecommended
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-red-400 bg-red-50 dark:bg-red-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {choice.label}
              {selected === i && choice.isRecommended && (
                <span className="ml-2 text-green-600 dark:text-green-400 text-sm">Recommended</span>
              )}
            </div>
            {selected === i && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{choice.explanation}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
