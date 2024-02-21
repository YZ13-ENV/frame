'use client'
import { cleanPathname, detectCategoryTab, detectSortTab, withCustomSortTab } from "@/const/categories"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { usePathname, useRouter } from "next/navigation"
import { useLayoutEffect, useMemo, useState } from "react"
const Order = dynamic(() => import('./order'))
const Category = dynamic(() => import('./category'))

type Props = {
    padding?: boolean
}
const Nav = ({ padding = false }: Props) => {
    const pathname = usePathname()
    const detectedSortTab = detectSortTab(pathname)
    const detectedCategoryTab = detectCategoryTab(pathname, detectedSortTab)
    const isShotsLayout = useMemo(() => pathname.startsWith('/shots'), [pathname])
    const isShotPage = useMemo(() => pathname.startsWith('/view'), [pathname])
    const [orderTab, setOrderTab] = useState<string>(detectedSortTab)
    const [categoryTab, setCategoryTab] = useState<string>(detectedCategoryTab ? detectedCategoryTab : withCustomSortTab(orderTab)[0].value)
    const router = useRouter()
    useLayoutEffect(() => {
        if (!isShotPage) {
            if (detectedSortTab !== orderTab || detectedCategoryTab !== categoryTab) {
                const newSegment = categoryTab === '/' ? orderTab : `${orderTab}${categoryTab}`
                const newPath = cleanPathname(pathname, detectedSortTab, detectedCategoryTab)
                router.push(newPath + newSegment)
            }
        }
    }, [pathname, isShotsLayout, isShotPage, orderTab, categoryTab])
    return (
        <div className={cn(
            padding ? 'px-6' : 'px-0',
            "nav-wrapper"
        )}>
            <Category value={categoryTab} onValueChange={value => setCategoryTab(value)} order={orderTab} />
            <Order value={orderTab} onValueChange={value => setOrderTab(value)} />
        </div>
    )
}

export default Nav