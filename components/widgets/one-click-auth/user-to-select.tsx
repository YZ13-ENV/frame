'use client'

import { cn } from "@/lib/utils"
import { ShortUserData, user as userAPI } from "api"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BiCheck } from "react-icons/bi"

type Props = {
  isCurrent?: boolean
  isSelected?: boolean
  uid: string
  noBorder?: boolean
  onSelect?: (user: ShortUserData) => void
}
const UserToSelect = ({ onSelect, isCurrent=false, isSelected=false, uid, noBorder=false }: Props) => {
  const [user, setUser] = useState<ShortUserData | null>(null)
  useEffect(() => {
    userAPI.byId.short(uid)
    .then(result => setUser(result))
  },[uid])
  if (!user) return null
  return (
    <div onClick={() => user && onSelect && onSelect(user)}
    className={cn(
      noBorder ? "border-b-0" : "border-b",
      "w-full p-3 flex items-center gap-2 hover:bg-card transition-colors cursor-pointer"
    )}>
      <div className="w-10 aspect-square relative flex items-center justify-center">
        {
          isCurrent && <div className="absolute z-10 w-full h-full flex items-center justify-center rounded-full bg-green-600">
            <BiCheck className="text-accent-foreground" size={24} />
          </div>
        }
        {
          user.photoUrl
          ? <Image className="rounded-full" src={user.photoUrl} width={40} height={40} alt="profile-photo" />
          : <div className="w-10 rounded-full aspect-square bg-muted" />
        }
      </div>
      <div className="h-full flex flex-col justify-center">
        <span className="font-medium leading-6">{ user.displayName || 'Пользователь' }</span>
        <span className="text-xs text-muted-foreground">{ user.position || user.email }</span>
      </div>
    </div>
  )
}

export default UserToSelect