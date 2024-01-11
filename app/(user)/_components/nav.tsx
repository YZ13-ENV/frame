'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

type Props = {
    path: string
}
const PortfolioNav = ({ path }: Props) => {
    const pathname = usePathname()
    const val = useMemo(() => {
        if (pathname.endsWith('/saved')) return '2'
        if (pathname.endsWith('/bio')) return '3'
        return '1'
    },[path, pathname])
    return (
        <Tabs value={val}>
            <TabsList>
                <TabsTrigger value="1"><Link href={path}>Работы</Link></TabsTrigger>
                <TabsTrigger value="2"><Link href={path + '/saved'}>Сохраненные</Link></TabsTrigger>
                <TabsTrigger value="3"><Link href={path + '/bio'}>Био</Link></TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default PortfolioNav