import { useState, useCallback } from 'react'

const FILTERS: Record<string, { name: string; kernel: number[][] }> = {
  horizontal: { name: 'Horizontal Edge', kernel: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]] },
  vertical: { name: 'Vertical Edge', kernel: [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]] },
  blur: { name: 'Blur (Average)', kernel: [[1/9, 1/9, 1/9], [1/9, 1/9, 1/9], [1/9, 1/9, 1/9]] },
  sharpen: { name: 'Sharpen', kernel: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] },
}

const PATTERNS: Record<string, { name: string; grid: number[][] }> = {
  edge: {
    name: 'Vertical Edge',
    grid: [
      [0, 0, 8, 8, 8],
      [0, 0, 8, 8, 8],
      [0, 0, 8, 8, 8],
      [0, 0, 8, 8, 8],
      [0, 0, 8, 8, 8],
    ],
  },
  gradient: {
    name: 'Gradient',
    grid: [
      [0, 2, 4, 6, 8],
      [0, 2, 4, 6, 8],
      [0, 2, 4, 6, 8],
      [0, 2, 4, 6, 8],
      [0, 2, 4, 6, 8],
    ],
  },
  checker: {
    name: 'Checkerboard',
    grid: [
      [8, 0, 8, 0, 8],
      [0, 8, 0, 8, 0],
      [8, 0, 8, 0, 8],
      [0, 8, 0, 8, 0],
      [8, 0, 8, 0, 8],
    ],
  },
  cross: {
    name: 'Cross',
    grid: [
      [0, 0, 8, 0, 0],
      [0, 0, 8, 0, 0],
      [8, 8, 8, 8, 8],
      [0, 0, 8, 0, 0],
      [0, 0, 8, 0, 0],
    ],
  },
}

function convolve(input: number[][], kernel: number[][]): number[][] {
  const rows = input.length - kernel.length + 1
  const cols = input[0].length - kernel[0].length + 1
  const out: number[][] = []
  for (let r = 0; r < rows; r++) {
    const row: number[] = []
    for (let c = 0; c < cols; c++) {
      let sum = 0
      for (let kr = 0; kr < kernel.length; kr++) {
        for (let kc = 0; kc < kernel[0].length; kc++) {
          sum += input[r + kr][c + kc] * kernel[kr][kc]
        }
      }
      row.push(Number(sum.toFixed(2)))
    }
    out.push(row)
  }
  return out
}

function cellBg(val: number, max: number, min: number): string {
  if (max === min) return 'rgba(59,130,246,0.3)'
  const norm = (val - min) / (max - min)
  return `rgba(59,130,246,${(0.1 + 0.8 * norm).toFixed(2)})`
}

export function CNNFilterVisualizer() {
  const [patternKey, setPatternKey] = useState('edge')
  const [filterKey, setFilterKey] = useState('vertical')
  const [step, setStep] = useState(-1)

  const input = PATTERNS[patternKey].grid
  const kernel = FILTERS[filterKey].kernel
  const output = convolve(input, kernel)
  const outFlat = output.flat()
  const outMin = Math.min(...outFlat)
  const outMax = Math.max(...outFlat)
  const outRows = output.length
  const outCols = output[0]?.length || 0
  const totalSteps = outRows * outCols

  const stepRow = step >= 0 ? Math.floor(step / outCols) : -1
  const stepCol = step >= 0 ? step % outCols : -1

  const nextStep = useCallback(() => {
    setStep(s => (s + 1) % totalSteps)
  }, [totalSteps])

  const inMax = Math.max(...input.flat())
  const inMin = Math.min(...input.flat())

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: CNN Filter Visualizer</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        The filter slides across the input. At each position, it computes a dot product. Different filters detect different patterns.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Input pattern:</p>
          <div className="flex gap-1">
            {Object.entries(PATTERNS).map(([k, v]) => (
              <button key={k} onClick={() => { setPatternKey(k); setStep(-1) }}
                className={`px-2 py-1 text-xs rounded ${patternKey === k ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >{v.name}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Filter:</p>
          <div className="flex gap-1">
            {Object.entries(FILTERS).map(([k, v]) => (
              <button key={k} onClick={() => { setFilterKey(k); setStep(-1) }}
                className={`px-2 py-1 text-xs rounded ${filterKey === k ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >{v.name}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 items-start">
        {/* Input grid */}
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">Input (5x5)</p>
          <table className="border-collapse">
            <tbody>
              {input.map((row, r) => (
                <tr key={r}>
                  {row.map((val, c) => {
                    const highlighted = step >= 0 && r >= stepRow && r < stepRow + 3 && c >= stepCol && c < stepCol + 3
                    return (
                      <td key={c}
                        className={`w-10 h-10 text-center text-xs font-mono border ${
                          highlighted ? 'border-2 border-yellow-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        style={{ backgroundColor: cellBg(val, inMax, inMin), color: val > (inMax + inMin) / 2 ? '#fff' : '#1f2937' }}
                      >
                        {val}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kernel */}
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">Filter (3x3)</p>
          <table className="border-collapse">
            <tbody>
              {kernel.map((row, r) => (
                <tr key={r}>
                  {row.map((val, c) => (
                    <td key={c}
                      className="w-10 h-10 text-center text-xs font-mono border border-gray-300 dark:border-gray-600 bg-amber-50 dark:bg-amber-900/20 text-gray-800 dark:text-gray-200"
                    >
                      {Number(val.toFixed(2))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Output */}
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">Output (3x3)</p>
          <table className="border-collapse">
            <tbody>
              {output.map((row, r) => (
                <tr key={r}>
                  {row.map((val, c) => {
                    const isCurrent = r === stepRow && c === stepCol
                    return (
                      <td key={c}
                        className={`w-10 h-10 text-center text-xs font-mono border ${
                          isCurrent ? 'border-2 border-green-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        style={{
                          backgroundColor: step === -1 || (r < stepRow || (r === stepRow && c <= stepCol))
                            ? cellBg(val, outMax, outMin)
                            : 'transparent',
                          color: val > (outMax + outMin) / 2 ? '#fff' : '#1f2937',
                        }}
                      >
                        {step === -1 || (r < stepRow || (r === stepRow && c <= stepCol))
                          ? val.toFixed(1)
                          : '?'}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={nextStep}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {step === -1 ? 'Start Step-Through' : step < totalSteps - 1 ? 'Next Step' : 'Restart'}
        </button>
        {step >= 0 && (
          <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
            Step {step + 1} of {totalSteps} — position ({stepRow},{stepCol})
            {step >= 0 && ` = ${output[stepRow]?.[stepCol]?.toFixed(1)}`}
          </span>
        )}
      </div>
    </div>
  )
}
