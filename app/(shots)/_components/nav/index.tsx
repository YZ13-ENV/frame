'use client'
import { cleanPathname, detectCategoryTab, detectSortTab } from "@/const/categories"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
const Order = dynamic(() => import('./order'))
const Category = dynamic(() => import('./category'))

type Props = {
    padding?: boolean
}
const Nav = ({ padding = false }: Props) => {
    const pathname = usePathname()
    const detectedSortTab = useMemo(() => { return detectSortTab(pathname) }, [pathname])
    const detectedCategoryTab = useMemo(() => { return detectCategoryTab(pathname, detectedSortTab) }, [pathname, detectedSortTab])
    const router = useRouter()
    const getNewOrderParams = (order: string, category: string) => `${order}${category}`
    const runWithNewParams = (customOrder?: string, customCategory?: string) => {
        const order = customOrder ? customOrder : detectedSortTab
        const category = customCategory ? customCategory : detectedCategoryTab
        const newSegment = getNewOrderParams(order, category)
        const newPath = cleanPathname(pathname, detectedSortTab, detectedCategoryTab)
        router.push(newPath + newSegment)
    }
    return (
        <div className={cn(
            padding ? 'px-6' : 'px-0',
            "nav-wrapper"
        )}>
            <Category value={detectedCategoryTab} onValueChange={value => runWithNewParams(detectedSortTab, value)} order={detectedSortTab} />
            <Order value={detectedSortTab} onValueChange={value => runWithNewParams(value)} />
        </div>
    )
}

export default Nav