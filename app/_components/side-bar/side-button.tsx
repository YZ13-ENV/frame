import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BiHome } from "react-icons/bi"
import { IconType } from "react-icons/lib"

type Props = {
  link?: string
  label?: string
  icon?: IconType
}
const SideButton = ({ label = "Не указано", link, icon }: Props) => {
  const size = 20
  return (
    <Button variant='ghost' size='lg' className="px-2 justify-start gap-2 relative">
      {link && <Link href={link} className="absolute w-full h-full left-0 top-0" />}
      <div className="w-9 flex items-center justify-center">
        {icon ? icon({ size: size }) : <BiHome size={size} />}
      </div>
      {label}
    </Button>
  )
}

export default SideButton