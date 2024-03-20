'use client'
import Avatar from "@/components/shared/avatar"
import { ShortUserData } from "@darkmaterial/api"
import { usePathname } from "next/navigation"
import { settings } from "./settings"

type Props = {
  author: ShortUserData
}
const SettingsHeader = ({ author }: Props) => {
  const path = usePathname()
    .replace('/settings', '')
    .replace('/', '')
  const section = settings[path]
  return (
    <div className="w-fit h-fit flex items-center gap-4">
      {
        author.photoUrl
          ? <Avatar src={author.photoUrl} size={48} />
          : <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
      }
      <div className="w-fit h-fit flex flex-col">
        <span className="text-lg font-semibold inline-flex gap-2 items-center">
          {author.nickname || author.displayName}
          <span className="text-muted-foreground">/</span>
          {section.section_name || 'Ошибка при выборе секции'}
        </span>
        <span className="text-muted-foreground text-sm">
          {section.description || 'Ошибка при выборе секции'}
        </span>
      </div>
    </div>
  )
}

export default SettingsHeader