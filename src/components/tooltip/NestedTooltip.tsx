import { useRef, useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface NestedTooltipProps {
  anchorRef: React.RefObject<HTMLElement | null>
  children: ReactNode
  onClose: () => void
  depth: number
}

export function NestedTooltip({ anchorRef, children, onClose, depth }: NestedTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    const tooltipW = 360
    const tooltipH = 300
    let top = rect.bottom + 8
    let left = rect.left + rect.width / 2 - tooltipW / 2

    if (left < 8) left = 8
    if (left + tooltipW > window.innerWidth - 8) left = window.innerWidth - tooltipW - 8
    if (top + tooltipH > window.innerHeight - 8) top = rect.top - tooltipH - 8
    if (top < 8) top = 8

    setPos({ top, left })
  }, [anchorRef])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const root = document.getElementById('tooltip-root')
  if (!root) return null

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed z-[100] w-[360px] max-h-[300px] overflow-y-auto bg-tooltip-bg border border-tooltip-border text-gray-100 rounded-lg shadow-xl p-4 text-sm"
      style={{ top: pos.top, left: pos.left, zIndex: 100 + depth }}
      onMouseLeave={onClose}
    >
      {children}
    </div>,
    root,
  )
}
