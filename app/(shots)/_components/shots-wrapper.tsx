'use client'

import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
const ShotsWrapper = ({ children }: Props) => {
  const searchParams = useSearchParams()
  const side = searchParams.get('side') || '0'
  const isOpen = side === '1'
  return (
    <div className={cn(
      isOpen ? "px-6" : "lg:px-24 md:px-12 px-6",
      "min-h-screen w-full relative py-12 "
    )}>
      {children}
    </div>
  )
}

export default ShotsWrapper