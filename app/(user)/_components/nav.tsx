'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioConfig } from "@/helpers/getPortfolio"
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"

type Props = {
  prefix: string
  layout: PortfolioConfig['type']
}
type NavTab = {
  value: string
  label: string
}
const tabs = (prefix?: string, layout?: PortfolioConfig['type']) => {
  const tabs = [
    {
      value: '/',
      label: 'Работы'
    },
    {
      value: '/bio',
      label: 'Био'
    },
    {
      value: '/saved',
      label: 'Сохраненные'
    },
    {
      value: '/members',
      label: 'Участники'
    }
  ]
  const team = ['/', '/bio', '/members']
  const user = ['/', '/bio']
  const team_tabs = tabs.filter(tab => team.includes(tab.value))
  const user_tabs = tabs.filter(tab => user.includes(tab.value))
  const implementPrefix = (tabs: NavTab[]) => tabs.map(tab => ({ ...tab, value: prefix ? prefix + tab.value : tab.value }))
  if (layout === 'user') return implementPrefix(user_tabs)
  if (layout === 'team') return implementPrefix(team_tabs)
  return implementPrefix(user_tabs)
}
const PortfolioTeamNav = ({ prefix, layout }: Props) => {
    const path = usePathname()
    const withPrefix = tabs(prefix, layout)
    const section = useMemo(() => {
      const root = prefix === path ? `${prefix}/` : path
      const detected = withPrefix.find(item => root === item.value)
      return detected ? detected.value : ''
    }, [path, prefix, withPrefix])
    const { push } = useRouter()
    return (
        <Tabs value={section} onValueChange={state => push(state)}>
          <TabsList className='!bg-transparent !p-0'>
            {
              tabs(prefix, layout)
              .map(tab =>
                <TabsTrigger value={tab.value} className="relative">
                  { tab.label }
                  {
                    tab.value === section && <motion.div layoutId='portfolio-tab'
                    className="absolute left-0 -bottom-3 w-full h-0.5 rounded-md bg-primary z-[-1]" />
                  }
                </TabsTrigger>
              )
            }
          </TabsList>
        </Tabs>
    )
}

export default PortfolioTeamNav