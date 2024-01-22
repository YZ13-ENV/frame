import { Button } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
  return (
    <div className='py-6 flex flex-col gap-1'>
      <span className="text-base font-medium">Изменить настройки профиля</span>
      <span className="text-sm text-muted-foreground">
        Настройки профиля изменяются в главное приложении, для удобства мы оставим ссылку ниже.
      </span>
      <Button variant='outline' className="mt-4 w-fit" asChild>
        <Link href='https://darkmaterial.space/account'>Перейти к настройкам профиля</Link>
      </Button>
    </div>
  )
}

export default page