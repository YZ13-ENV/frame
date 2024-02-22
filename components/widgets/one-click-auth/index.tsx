'use client'
import UserToSelect from "./user-to-select"
import { useState } from "react"
import { ShortUserData, cdn } from "api"
import { Button } from "@/components/ui/button"
import { User } from "firebase/auth"
import Image from "next/image"
import { BiX } from "react-icons/bi"

type Props = {
  onUser?: (uid: string) => void
  user?: User | null | undefined
  members?: string[]
}
const OneClickAuth = ({ onUser, members = [], user = null }: Props) => {
  const [forcedClose, setForcedClose] = useState<boolean>(false)
  const [selected, setSelected] = useState<ShortUserData | null>(null)
  const signInWithSelected = () => {
    if (selected && onUser) onUser(selected.uid)
  }
  if (forcedClose) return null
  return (
    <div className="absolute md:!top-4 -top-2.5 md:!right-4 -right-6 md:!w-96 w-screen h-fit rounded-lg bg-background border z-50">
      <div className="w-full h-fit p-4 space-y-2">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-2">
            <Image src={cdn('/dm/icons/dm-star-dark.svg')} width={24} height={24} alt='star-logo' />
            <span className="text-base font-medium">Darkmaterial</span>
          </div>
          <Button size='icon' variant='ghost' onClick={() => setForcedClose(true)}><BiX size={18} /></Button>
        </div>
        <div className="w-full flex flex-col">
          {
            members.map((member, i, arr) =>
              <UserToSelect
                key={member + "-fast-pick"}
                uid={member}
                noBorder={i === (arr.length - 1)}
                onSelect={setSelected}
                isSelected={selected ? member === selected.uid : false}
                isCurrent={user ? member === user.uid : false}
              />
            )
          }
        </div>
        {
          selected &&
          <Button className="w-full" onClick={signInWithSelected}>
            Продолжить как {selected.nickname || selected.displayName || 'Пользователь'}
          </Button>
        }
      </div>
    </div>
  )
}

export default OneClickAuth