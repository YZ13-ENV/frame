'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

type Props = {
    path: string
    isYou?: boolean
}
const PortfolioNav = ({ path, isYou }: Props) => {
    const pathname = usePathname()
    const val = useMemo(() => {
        if (pathname.endsWith('/saved')) return '/saved'
        if (pathname.endsWith('/bio')) return '/bio'
        return '/'
    },[path, pathname])
    return (
        <Tabs value={val}>
            <TabsList>
                <TabsTrigger value="/"><Link href={path}>Работы</Link></TabsTrigger>
                { isYou && <TabsTrigger value="/saved"><Link href={path + '/saved'}>Сохраненные</Link></TabsTrigger> }
                <TabsTrigger value="/bio"><Link href={path + '/bio'}>Био</Link></TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default PortfolioNav