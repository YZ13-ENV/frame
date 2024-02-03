'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioConfig } from "@/helpers/getPortfolio"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

type Props = {
  prefix: string
  layout: PortfolioConfig['type']
}
const PortfolioTeamNav = ({ prefix, layout }: Props) => {
    const pathname = usePathname()
    const val = useMemo(() => {
        if (layout === 'team') {
            if (pathname.endsWith('/members')) return '/members'
            if (pathname.endsWith('/bio')) return '/bio'
            return '/'
        } else {
            if (pathname.endsWith('/saved')) return '/saved'
            if (pathname.endsWith('/bio')) return '/bio'
            return '/'
        }
    },[prefix, pathname])
    if (layout === 'team') {
      return (
        <Tabs value={val}>
          <TabsList>
            <TabsTrigger value="/"><Link href={prefix}>Работы</Link></TabsTrigger>
            <TabsTrigger value="/bio"><Link href={prefix + '/members'}>Участники</Link></TabsTrigger>
            {/* { isYou && <TabsTrigger value="/saved"><Link href={prefix + '/saved'}>Сохраненные</Link></TabsTrigger> } */}
            <TabsTrigger value="/bio"><Link href={prefix + '/bio'}>Био</Link></TabsTrigger>
          </TabsList>
        </Tabs>
      )
    }
    return (
        <Tabs value={val}>
          <TabsList>
            <TabsTrigger value="/"><Link href={prefix}>Работы</Link></TabsTrigger>
            {/* { isYou && <TabsTrigger value="/saved"><Link href={prefix + '/saved'}>Сохраненные</Link></TabsTrigger> } */}
            <TabsTrigger value="/bio"><Link href={prefix + '/bio'}>Био</Link></TabsTrigger>
          </TabsList>
        </Tabs>
    )
}

export default PortfolioTeamNav