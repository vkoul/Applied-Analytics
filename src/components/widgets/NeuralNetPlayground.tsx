import { useState, useMemo } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts'

function sigmoid(x: number): number { return 1 / (1 + Math.exp(-x)) }
function relu(x: number): number { return Math.max(0, x) }

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateXOR() {
  const points: { x1: number; x2: number; label: number }[] = []
  const rng = seededRandom(77)
  for (let i = 0; i < 100; i++) {
    const x1 = rng() * 2 - 1
    const x2 = rng() * 2 - 1
    const label = (x1 > 0) !== (x2 > 0) ? 1 : 0
    points.push({ x1: Number(x1.toFixed(3)), x2: Number(x2.toFixed(3)), label })
  }
  return points
}

function trainSimpleNet(data: { x1: number; x2: number; label: number }[], hiddenSize: number, activation: 'sigmoid' | 'relu') {
  const rng = seededRandom(42)
  const act = activation === 'sigmoid' ? sigmoid : relu
  const lr = activation === 'sigmoid' ? 0.5 : 0.01

  const W1: number[][] = Array.from({ length: hiddenSize }, () =>
    [(rng() - 0.5) * 2, (rng() - 0.5) * 2]
  )
  const b1: number[] = Array.from({ length: hiddenSize }, () => (rng() - 0.5) * 0.5)
  const W2: number[] = Array.from({ length: hiddenSize }, () => (rng() - 0.5) * 2)
  let b2 = (rng() - 0.5) * 0.5

  const epochs = activation === 'sigmoid' ? 500 : 300
  for (let ep = 0; ep < epochs; ep++) {
    for (const pt of data) {
      const hidden = W1.map((w, j) => act(w[0] * pt.x1 + w[1] * pt.x2 + b1[j]))
      const out = sigmoid(hidden.reduce((s, h, j) => s + h * W2[j], 0) + b2)
      const err = out - pt.label

      for (let j = 0; j < hiddenSize; j++) {
        const dOut = err * out * (1 - out)
        const dHidden = dOut * W2[j]
        const hVal = W1[j][0] * pt.x1 + W1[j][1] * pt.x2 + b1[j]
        const dAct = activation === 'sigmoid' ? sigmoid(hVal) * (1 - sigmoid(hVal)) : hVal > 0 ? 1 : 0

        W2[j] -= lr * dOut * hidden[j]
        W1[j][0] -= lr * dHidden * dAct * pt.x1
        W1[j][1] -= lr * dHidden * dAct * pt.x2
        b1[j] -= lr * dHidden * dAct
      }
      b2 -= lr * err * out * (1 - out)
    }
  }

  return (x1: number, x2: number): number => {
    const hidden = W1.map((w, j) => act(w[0] * x1 + w[1] * x2 + b1[j]))
    return sigmoid(hidden.reduce((s, h, j) => s + h * W2[j], 0) + b2)
  }
}

export function NeuralNetPlayground() {
  const [hiddenSize, setHiddenSize] = useState(4)
  const [activation, setActivation] = useState<'sigmoid' | 'relu'>('sigmoid')

  const data = useMemo(() => generateXOR(), [])

  const { grid, accuracy } = useMemo(() => {
    const predict = trainSimpleNet(data, hiddenSize, activation)

    const gridPts: { x1: number; x2: number; pred: number }[] = []
    const step = 0.1
    for (let x1 = -1; x1 <= 1; x1 += step) {
      for (let x2 = -1; x2 <= 1; x2 += step) {
        gridPts.push({ x1: Number(x1.toFixed(1)), x2: Number(x2.toFixed(1)), pred: predict(x1, x2) })
      }
    }

    let correct = 0
    for (const pt of data) {
      const p = predict(pt.x1, pt.x2)
      if ((p >= 0.5 ? 1 : 0) === pt.label) correct++
    }

    return { grid: gridPts, accuracy: (correct / data.length * 100).toFixed(0) }
  }, [data, hiddenSize, activation])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: Neural Network Playground</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        With 1 hidden neuron, only a linear boundary is possible. Add neurons to see how the network carves increasingly complex boundaries. Dataset: XOR pattern.
      </p>

      <div className="flex flex-wrap gap-6 mb-2">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Hidden neurons: <span className="font-mono">{hiddenSize}</span>
          <div className="flex gap-2 mt-1">
            {[1, 2, 4, 8].map(n => (
              <button key={n} onClick={() => setHiddenSize(n)}
                className={`px-3 py-1 text-sm rounded ${hiddenSize === n ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >{n}</button>
            ))}
          </div>
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Activation:
          <div className="flex gap-2 mt-1">
            {(['sigmoid', 'relu'] as const).map(a => (
              <button key={a} onClick={() => setActivation(a)}
                className={`px-3 py-1 text-sm rounded ${activation === a ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >{a}</button>
            ))}
          </div>
        </label>
        <div className="text-sm text-gray-600 dark:text-gray-400 self-end">
          Accuracy: <span className="font-mono font-semibold text-green-600 dark:text-green-400">{accuracy}%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="x1" type="number" domain={[-1.1, 1.1]} tick={{ fontSize: 10, fill: '#9ca3af' }} name="x1" />
          <YAxis dataKey="x2" type="number" domain={[-1.1, 1.1]} tick={{ fontSize: 10, fill: '#9ca3af' }} name="x2" />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
          <Scatter data={grid} r={4} shape="square" fillOpacity={0.3}>
            {grid.map((pt, i) => (
              <Cell key={i} fill={pt.pred > 0.5 ? '#3b82f6' : '#ef4444'} />
            ))}
          </Scatter>
          <Scatter data={data.map(d => ({ x1: d.x1, x2: d.x2, label: d.label }))} r={5} fillOpacity={0.9} strokeWidth={1} stroke="#1f2937">
            {data.map((pt, i) => (
              <Cell key={i} fill={pt.label === 1 ? '#3b82f6' : '#ef4444'} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
        Background: predicted regions. Dots: actual data (blue = class 1, red = class 0).
      </p>
    </div>
  )
}
