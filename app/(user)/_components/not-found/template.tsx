import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cdn } from "@/helpers/cdn"
import Image from "next/image"
import Link from "next/link"

const NotFoundTemplate = () => {
    return (
      <div  className="w-full h-screen flex items-center justify-center flex-col gap-6">
        <div className="w-fit h-fit flex items-center gap-4">
          <Image src={cdn('dm/icons/DM-dark.svg')} width={48} height={48} alt='dm-logo' />
          <Separator orientation="vertical" />
          <span className="text-4xl">404</span>
        </div>
        <span className="text-muted-foreground text-center">
          Что-то пошло не так. <br />
          Перезагрузите страницу, или попробуйте в другое время.
        </span>
        <Button variant='outline'><Link href='/'>Вернуться</Link></Button>
      </div>
    )
}

export default NotFoundTemplate