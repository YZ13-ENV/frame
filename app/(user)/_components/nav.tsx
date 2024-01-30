'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

type Props = {
    path: string
    isYou?: boolean
    teamId?: string
}
const PortfolioTeamNav = ({ path, isYou, teamId }: Props) => {
    const pathname = usePathname()
    const val = useMemo(() => {
        if (teamId) {
            if (pathname.endsWith('/members')) return '/members'
            if (pathname.endsWith('/bio')) return '/bio'
            return '/'
        } else {
            if (pathname.endsWith('/saved')) return '/saved'
            if (pathname.endsWith('/bio')) return '/bio'
            return '/'
        }
    },[path, pathname])
    if (teamId) {
      return (
        <Tabs value={val}>
          <TabsList>
            <TabsTrigger value="/"><Link href={path}>Работы</Link></TabsTrigger>
            <TabsTrigger value="/bio"><Link href={path + '/members'}>Участники</Link></TabsTrigger>
            {/* { isYou && <TabsTrigger value="/saved"><Link href={path + '/saved'}>Сохраненные</Link></TabsTrigger> } */}
            <TabsTrigger value="/bio"><Link href={path + '/bio'}>Био</Link></TabsTrigger>
          </TabsList>
        </Tabs>
      )
    }
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

export default PortfolioTeamNav