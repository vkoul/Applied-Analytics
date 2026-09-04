import { useEffect, useRef } from 'react'
import katex from 'katex'

interface MathBlockProps {
  tex: string
  display?: boolean
}

export function MathBlock({ tex, display = false }: MathBlockProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      })
    }
  }, [tex, display])

  return display ? (
    <div className="my-4 overflow-x-auto text-center">
      <span ref={ref} />
    </div>
  ) : (
    <span ref={ref} className="mx-0.5" />
  )
}
