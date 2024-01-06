'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categories, cleanPathname, detectCategoryTab, detectSortTab, withCustomSortTab } from "@/const/categories"
import { usePathname, useRouter } from "next/navigation"
import { useLayoutEffect, useMemo, useState } from "react"

type Props = {

}
const Nav = () => {
    const pathname = usePathname()
    // const excludeIf = (val: string, notSupported: boolean=false) => {
    //     if ((!user || !isSub || notSupported) && val === '/recommendations') return false
    //     if ((!user || notSupported) && val === '/following') return false
    //     if (!user && val === '/following') return false
    //     return true
    // }
    const detectedSortTab = detectSortTab(pathname)
    const detectedCategoryTab = detectCategoryTab(pathname, detectedSortTab)
    // const options = sortTabs(integrationMode) // .filter(opt => pathname.includes('/shots') ? excludeIf(opt.value, false) : excludeIf(opt.value, true))
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
    },[isShotsLayout, isShotPage, orderTab, categoryTab])
    return (
        <div className="relative z-40 flex flex-row items-center justify-center w-full gap-8 px-6 my-6 shrink-0 h-fit">
            <div onClick={() => orderTab === '/popular' ? setOrderTab('/new') : setOrderTab('/popular')}
            className={`flex items-center justify-center w-fit gap-2 shrink-0 h-fit`}>
                <span className={`text-sm font-medium transition-all ${ orderTab === '/popular' ? 'text-secondary-foreground' : 'text-muted-foreground' }`}>Популярные</span>
                <Switch checked={ orderTab === '/popular' ? false : true } />
                <span className={`text-sm font-medium transition-all ${ orderTab === '/new' ? 'text-secondary-foreground' : 'text-muted-foreground' } `}>Новые</span>
            </div>
            <div className="nav-select">
                <Select defaultValue="/" value={categoryTab}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className='z-20'>
                            {
                                withCustomSortTab(orderTab).map(tab =>
                                    <SelectItem key={tab.value} onClick={() => setCategoryTab(tab.value)} value={tab.value}
                                    >{tab.label}</SelectItem>
                                )
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="nav-tabs">
                <Tabs defaultValue="/" value={categoryTab}  className="w-fit">
                    <TabsList>
                        {
                            withCustomSortTab(orderTab).map(tab =>
                                <TabsTrigger key={tab.value} onClick={() => setCategoryTab(tab.value)} value={tab.value}>{tab.label}</TabsTrigger>
                                )
                        }
                    </TabsList>
                </Tabs>
            </div>
        </div>
    )
}

export default Nav