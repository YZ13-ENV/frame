import Link from "next/link"
import { BiChevronRight } from "react-icons/bi"

type Props = {
  title: string
  description: string
  link: string
}
const SettingsLink = ({ description, link, title }: Props) => {
  return (
    <Link href={link}
    className="w-full h-fit flex items-center gap-2 justify-between border rounded-lg p-4">
      <div className="w-full h-fit flex flex-col gap-1">
        <span className="text-base font-medium inline-flex gap-2">{ title }</span>
        <span className='text-sm text-muted-foreground'>{ description }</span>
      </div>
      <BiChevronRight className='text-muted-foreground' size={20} />
    </Link>
  )
}

export default SettingsLink