'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { links, settings } from './settings'
import { useMediaQuery } from 'react-responsive'
import { Select, SelectTrigger, SelectItem, SelectContent } from '@/components/ui/select'
import { usePathname } from 'next/navigation'

const SettingsSideNav = () => {
  const prefix = '/settings/'
  const path = usePathname()
  const section_name = path
  .replace('/settings', '')
  .replace('/', '')
  const section = settings[section_name]
  const nav_links = links.map(link => {
    const name = settings[link].section_name
    const obj = {
      name: name || 'Не указано',
      link: prefix + link
    }
    return obj
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  if (isTabletOrMobile) return (
    <nav className="w-full h-fit shrink-0 py-6 flex flex-col">
      <Select value={path}>
        <SelectTrigger>{section.section_name}</SelectTrigger>
        <SelectContent>
          {
            nav_links.map(nav =>
              <SelectItem key={nav.link} value={nav.link}>
                {nav.name}
              </SelectItem>
            )
          }
        </SelectContent>
      </Select>
    </nav>
  )
  return (
    <nav className="w-48 h-fit shrink-0 py-6 flex flex-col">
      {
        nav_links.map(nav =>
          <Button key={nav.link}
          variant='ghost' className="justify-start" asChild>
            <Link href={nav.link}>{nav.name}</Link>
          </Button>
        )
      }
    </nav>
  )
}

export default SettingsSideNav