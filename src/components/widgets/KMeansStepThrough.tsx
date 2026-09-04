import { useState, useMemo, useCallback } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend, Cell } from 'recharts'

const CLUSTER_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

function gaussianPair(rng: () => number): [number, number] {
  const u1 = rng()
  const u2 = rng()
  const r = Math.sqrt(-2 * Math.log(u1 || 0.0001))
  return [r * Math.cos(2 * Math.PI * u2), r * Math.sin(2 * Math.PI * u2)]
}

interface Point { x: number; y: number; cluster: number }
interface Centroid { x: number; y: number }

function generateData(seed: number): Point[] {
  const rng = seededRandom(seed)
  const centers = [
    { x: 3, y: 7 },
    { x: 8, y: 3 },
    { x: 6, y: 9 },
  ]
  const points: Point[] = []
  for (const c of centers) {
    for (let i = 0; i < 20; i++) {
      const [dx, dy] = gaussianPair(rng)
      points.push({ x: Number((c.x + dx * 1.2).toFixed(2)), y: Number((c.y + dy * 1.2).toFixed(2)), cluster: -1 })
    }
  }
  return points
}

function initCentroids(points: Point[], k: number, rng: () => number): Centroid[] {
  const shuffled = [...points].sort(() => rng() - 0.5)
  return shuffled.slice(0, k).map(p => ({ x: p.x, y: p.y }))
}

function assignClusters(points: Point[], centroids: Centroid[]): Point[] {
  return points.map(p => {
    let minDist = Infinity
    let best = 0
    centroids.forEach((c, i) => {
      const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2
      if (d < minDist) { minDist = d; best = i }
    })
    return { ...p, cluster: best }
  })
}

function recomputeCentroids(points: Point[], k: number): Centroid[] {
  const centroids: Centroid[] = []
  for (let i = 0; i < k; i++) {
    const members = points.filter(p => p.cluster === i)
    if (members.length === 0) {
      centroids.push({ x: Math.random() * 10, y: Math.random() * 10 })
    } else {
      centroids.push({
        x: Number((members.reduce((s, p) => s + p.x, 0) / members.length).toFixed(2)),
        y: Number((members.reduce((s, p) => s + p.y, 0) / members.length).toFixed(2)),
      })
    }
  }
  return centroids
}

export function KMeansStepThrough() {
  const [seed, setSeed] = useState(42)
  const [k, setK] = useState(3)
  const [step, setStep] = useState(0)
  const [points, setPoints] = useState<Point[]>(() => generateData(42))
  const [centroids, setCentroids] = useState<Centroid[]>(() => {
    const rng = seededRandom(42 + 1000)
    return initCentroids(generateData(42), 3, rng)
  })
  const [converged, setConverged] = useState(false)

  const reset = useCallback(() => {
    const newSeed = Date.now() % 100000
    setSeed(newSeed)
    const newPoints = generateData(newSeed)
    const rng = seededRandom(newSeed + 1000)
    setPoints(newPoints)
    setCentroids(initCentroids(newPoints, k, rng))
    setStep(0)
    setConverged(false)
  }, [k])

  const changeK = useCallback((newK: number) => {
    setK(newK)
    const data = generateData(seed)
    const rng = seededRandom(seed + 1000)
    setPoints(data)
    setCentroids(initCentroids(data, newK, rng))
    setStep(0)
    setConverged(false)
  }, [seed])

  const doStep = useCallback(() => {
    if (converged) return
    const newPoints = assignClusters(points, centroids)
    const newCentroids = recomputeCentroids(newPoints, k)
    const moved = newCentroids.some((c, i) =>
      Math.abs(c.x - centroids[i].x) > 0.001 || Math.abs(c.y - centroids[i].y) > 0.001
    )
    setPoints(newPoints)
    setCentroids(newCentroids)
    setStep(s => s + 1)
    if (!moved) setConverged(true)
  }, [points, centroids, k, converged])

  const scatterData = useMemo(() => {
    const groups: Record<number, { x: number; y: number }[]> = {}
    for (const p of points) {
      const c = p.cluster < 0 ? 0 : p.cluster
      if (!groups[c]) groups[c] = []
      groups[c].push({ x: p.x, y: p.y })
    }
    return groups
  }, [points])

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive: K-Means Step-Through</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Click Step to watch K-means alternate between assigning points and moving centroids.
        Notice how it can converge to different solutions depending on initialization.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          K = {k}
          <input type="range" min={2} max={5} step={1} value={k}
            onChange={e => changeK(Number(e.target.value))}
            className="ml-2 w-24 align-middle" />
        </label>
        <button onClick={doStep} disabled={converged}
          className="px-4 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed">
          Step
        </button>
        <button onClick={reset}
          className="px-4 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          Reset
        </button>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Step {step} {converged && <span className="text-green-500 font-medium ml-1">Converged!</span>}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="x" type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} domain={[-2, 14]} />
          <YAxis dataKey="y" type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} domain={[-2, 14]} />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#e5e7eb' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {Object.entries(scatterData).map(([cluster, data]) => (
            <Scatter key={cluster} name={`Cluster ${Number(cluster) + 1}`} data={data} fill={CLUSTER_COLORS[Number(cluster) % CLUSTER_COLORS.length]} opacity={0.7} />
          ))}
          <Scatter name="Centroids" data={centroids.map(c => ({ x: c.x, y: c.y }))} shape="diamond" legendType="diamond">
            {centroids.map((_, i) => (
              <Cell key={i} fill={CLUSTER_COLORS[i % CLUSTER_COLORS.length]} stroke="#000" strokeWidth={2} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
