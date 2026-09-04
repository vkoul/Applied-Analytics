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
  const { chain, addToChain, removeFromChain, isInChain } = useTooltipChain()
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const concept = getConcept(conceptId)

  const handleEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setOpen(true)
      addToChain(conceptId)
    }, 300)
  }, [conceptId, addToChain])

  const handleLeave = useCallback(() => {
    clearTimeout(timerRef.current)
    setTimeout(() => {
      setOpen(false)
      removeFromChain(conceptId)
    }, 200)
  }, [conceptId, removeFromChain])

  const inChain = isInChain(conceptId)

  return (
    <>
      <span
        ref={ref}
        className={inChain ? 'concept-link--in-chain' : 'concept-link'}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </span>
      {open && concept && (
        <NestedTooltip anchorRef={ref} onClose={() => { setOpen(false); removeFromChain(conceptId) }} depth={chain.length}>
          <div className="font-semibold text-tooltip-link mb-1">{concept.displayName}</div>
          <div className="text-gray-300 text-xs mb-2">{concept.shortDefinition}</div>
          <div className="space-y-2">{concept.content}</div>
        </NestedTooltip>
      )}
    </>
  )
}
