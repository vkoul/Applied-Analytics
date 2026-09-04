import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface NestedTooltipProps {
  anchorRef: React.RefObject<HTMLElement | null>
  children: ReactNode
  onRequestClose: () => void
  onMouseEnterTooltip: () => void
  onMouseLeaveTooltip: () => void
  depth: number
  locked: boolean
}

const TOOLTIP_W = 360
const TOOLTIP_MAX_H = 300
const MARGIN = 8

function computePosition(anchorRect: DOMRect) {
  const vw = window.innerWidth
  const vh = window.innerHeight

  const spaceBelow = vh - anchorRect.bottom - MARGIN
  const spaceAbove = anchorRect.top - MARGIN
  const spaceRight = vw - anchorRect.right - MARGIN
  const spaceLeft = anchorRect.left - MARGIN

  let top: number
  let left: number

  // Prefer below, then above, then right, then left
  if (spaceBelow >= TOOLTIP_MAX_H || spaceBelow >= spaceAbove) {
    top = anchorRect.bottom + MARGIN
    left = anchorRect.left + anchorRect.width / 2 - TOOLTIP_W / 2
  } else if (spaceAbove >= TOOLTIP_MAX_H) {
    top = anchorRect.top - TOOLTIP_MAX_H - MARGIN
    left = anchorRect.left + anchorRect.width / 2 - TOOLTIP_W / 2
  } else if (spaceRight >= TOOLTIP_W) {
    top = anchorRect.top
    left = anchorRect.right + MARGIN
  } else if (spaceLeft >= TOOLTIP_W) {
    top = anchorRect.top
    left = anchorRect.left - TOOLTIP_W - MARGIN
  } else {
    top = anchorRect.bottom + MARGIN
    left = anchorRect.left + anchorRect.width / 2 - TOOLTIP_W / 2
  }

  // Clamp to viewport
  if (left < MARGIN) left = MARGIN
  if (left + TOOLTIP_W > vw - MARGIN) left = vw - TOOLTIP_W - MARGIN
  if (top < MARGIN) top = MARGIN
  if (top + TOOLTIP_MAX_H > vh - MARGIN) top = Math.max(MARGIN, vh - TOOLTIP_MAX_H - MARGIN)

  return { top, left }
}

export function NestedTooltip({
  anchorRef, children, onRequestClose,
  onMouseEnterTooltip, onMouseLeaveTooltip,
  depth, locked,
}: NestedTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!anchorRef.current) return
    setPos(computePosition(anchorRef.current.getBoundingClientRect()))
    // Trigger entrance animation on next frame
    requestAnimationFrame(() => setVisible(true))
  }, [anchorRef])

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onRequestClose()
  }, [onRequestClose])

  useEffect(() => {
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [handleEsc])

  const root = document.getElementById('tooltip-root')
  if (!root) return null

  return createPortal(
    <div
      ref={tooltipRef}
      className={`fixed w-[360px] max-h-[300px] overflow-y-auto bg-tooltip-bg rounded-lg shadow-xl text-sm text-gray-100 transition-all duration-200 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      } ${locked ? 'border-2 border-blue-400' : 'border border-tooltip-border'}`}
      style={{ top: pos.top, left: pos.left, zIndex: 100 + depth }}
      onMouseEnter={onMouseEnterTooltip}
      onMouseLeave={onMouseLeaveTooltip}
    >
      {/* Lock progress bar */}
      <div className="h-[3px] w-full bg-gray-700 rounded-t-lg overflow-hidden">
        <div
          className={`h-full bg-blue-400 ${locked ? '' : 'animate-[lockfill_600ms_linear_forwards]'}`}
          style={locked ? { width: '100%' } : undefined}
        />
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>,
    root,
  )
}
