'use client'
import { useSearchParams } from "next/navigation"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
}
const SidebarWrapper = ({ children }: Props) => {
  const searchParams = useSearchParams()
  const side = searchParams.get('side') || '0'
  const isOpen = side === '1'
  if (!isOpen) return null
  return (
    <aside className="lg:!relative absolute left-0 top-0 z-20 bg-background md:!w-64 w-full shrink-0 h-full flex flex-col">
      {children}
    </aside>
  )
}

export default SidebarWrapper