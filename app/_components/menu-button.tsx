'use client'

import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BiMenu, BiX } from "react-icons/bi"

const MenuButton = () => {
  const searchParams = useSearchParams()
  const side = searchParams.get('side')
  const stableSideValue = side ? side : "0"
  const isOpen = stableSideValue === '1'
  const path = usePathname()
  const { replace } = useRouter()
  const icon_size = 20
  const onClick = () => {
    if (side) {
      const newSideValue = isOpen ? "0" : "1"
      const newPath = path + "?side=" + newSideValue
      replace(newPath)
    } else {
      const newPath = path + "?side=1"
      replace(newPath)
    }
  }
  return (
    <Button onClick={onClick} size='icon' variant='ghost'>
      {
        isOpen
          ? <BiX size={icon_size} />
          : <BiMenu size={icon_size} />
      }
    </Button>
  )
}

export default MenuButton