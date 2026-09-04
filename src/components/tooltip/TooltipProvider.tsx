import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface TooltipState {
  chain: string[]
  addToChain: (id: string) => void
  removeFromChain: (id: string) => void
  clearChain: () => void
  isInChain: (id: string) => boolean
}

const TooltipContext = createContext<TooltipState>({
  chain: [],
  addToChain: () => {},
  removeFromChain: () => {},
  clearChain: () => {},
  isInChain: () => false,
})

export function useTooltipChain() {
  return useContext(TooltipContext)
}

export function TooltipProvider({ children }: { children: ReactNode }) {
  const [chain, setChain] = useState<string[]>([])

  const addToChain = useCallback((id: string) => {
    setChain(prev => {
      if (prev.includes(id)) return prev
      const limited = prev.length >= 4 ? prev.slice(1) : prev
      return [...limited, id]
    })
  }, [])

  const removeFromChain = useCallback((id: string) => {
    setChain(prev => {
      const idx = prev.indexOf(id)
      if (idx === -1) return prev
      return prev.slice(0, idx)
    })
  }, [])

  const clearChain = useCallback(() => setChain([]), [])
  const isInChain = useCallback((id: string) => chain.includes(id), [chain])

  return (
    <TooltipContext.Provider value={{ chain, addToChain, removeFromChain, clearChain, isInChain }}>
      {children}
    </TooltipContext.Provider>
  )
}
