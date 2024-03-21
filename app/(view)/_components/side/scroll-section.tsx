"use client"
import { useDebounceEffect, useInViewport } from "ahooks"
import { motion } from "framer-motion"

type Props = {
  selected?: boolean
  onInView?: (response: InViewResponse) => void
  elementId: string
  name?: string
}
export type InViewResponse = {
  ratio: number
  id: string
}
const ScrollSection = ({ elementId, name = "Не указано", onInView, selected = false }: Props) => {
  const element = document.getElementById(elementId)
  const [inView, ratio] = useInViewport(element, { threshold: [0, 0.25, 0.5, 0.75, 1], })
  useDebounceEffect(() => {
    if (onInView) {
      if (inView && ratio && ratio === 1) onInView({
        id: elementId,
        ratio: ratio || 0
      })
    }
  }, [inView, onInView, ratio], { wait: 250 })
  return (
    <div className="w-full z-[10] flex items-center h-9 gap-2">
      <div className="h-full w-1">
        {selected && <motion.div layoutId="visible-section" className="w-full h-full bg-primary rounded-full" />}
      </div>
      <span className="text-sm text-accent-foreground">{name}</span>
    </div>
  )
}

export default ScrollSection