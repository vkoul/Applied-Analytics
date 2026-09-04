interface KeyTakeawaysProps {
  items: string[]
}

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  return (
    <div className="my-8 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-5 rounded-r-lg">
      <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">Key Takeaways</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-green-700 dark:text-green-300">
            <span className="shrink-0 mt-1">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
