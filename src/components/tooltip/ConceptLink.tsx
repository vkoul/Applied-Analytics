import { useRef, useState, useCallback, type ReactNode } from 'react'
import { getConcept } from '../../data/conceptDefinitions'
import { useTooltipChain } from './TooltipProvider'
import { NestedTooltip } from './NestedTooltip'

interface ConceptLinkProps {
  conceptId: string
  children: ReactNode
}

export function ConceptLink({ conceptId, children }: ConceptLinkProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const [locked, setLocked] = useState(false)
  const { chain, addToChain, removeFromChain, isInChain } = useTooltipChain()

  const showTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const lockTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const dismissTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const concept = getConcept(conceptId)

  const close = useCallback(() => {
    clearTimeout(showTimer.current)
    clearTimeout(lockTimer.current)
    clearTimeout(dismissTimer.current)
    setOpen(false)
    setLocked(false)
    removeFromChain(conceptId)
  }, [conceptId, removeFromChain])

  const cancelDismiss = useCallback(() => {
    clearTimeout(dismissTimer.current)
  }, [])

  const scheduleDismiss = useCallback(() => {
    clearTimeout(dismissTimer.current)
    // Locked tooltips get a longer grace period
    const grace = locked ? 300 : 150
    dismissTimer.current = setTimeout(close, grace)
  }, [close, locked])

  const handleEnterLink = useCallback(() => {
    cancelDismiss()
    if (open) return // already showing
    showTimer.current = setTimeout(() => {
      setOpen(true)
      addToChain(conceptId)
      // Start lock timer: after 600ms the tooltip becomes "locked" (interactive)
      lockTimer.current = setTimeout(() => setLocked(true), 600)
    }, 300)
  }, [conceptId, addToChain, open, cancelDismiss])

  const handleLeaveLink = useCallback(() => {
    clearTimeout(showTimer.current)
    scheduleDismiss()
  }, [scheduleDismiss])

  const handleEnterTooltip = useCallback(() => {
    cancelDismiss()
  }, [cancelDismiss])

  const handleLeaveTooltip = useCallback(() => {
    scheduleDismiss()
  }, [scheduleDismiss])

  const inChain = isInChain(conceptId)

  return (
    <>
      <span
        ref={ref}
        className={inChain ? 'concept-link--in-chain' : 'concept-link'}
        onMouseEnter={handleEnterLink}
        onMouseLeave={handleLeaveLink}
      >
        {children}
      </span>
      {open && concept && (
        <NestedTooltip
          anchorRef={ref}
          onRequestClose={close}
          onMouseEnterTooltip={handleEnterTooltip}
          onMouseLeaveTooltip={handleLeaveTooltip}
          depth={chain.length}
          locked={locked}
        >
          <div className="font-semibold text-tooltip-link mb-1">{concept.displayName}</div>
          <div className="text-gray-300 text-xs mb-2">{concept.shortDefinition}</div>
          <div className="space-y-2">{concept.content}</div>
        </NestedTooltip>
      )}
    </>
  )
}
