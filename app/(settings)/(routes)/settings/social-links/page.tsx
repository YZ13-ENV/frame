import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const page = () => {
  return (
    <div className="py-6 flex flex-col gap-6 w-full">
      <div className="w-full h-fit flex flex-col gap-2">
        <span className="font-medium">Behance</span>
        <Input className="w-full" placeholder="Укажите ссылку здесь" />
      </div>
      <div className="w-full h-fit flex flex-col gap-2">
        <span className="font-medium">Dribbble</span>
        <Input className="w-full" placeholder="Укажите ссылку здесь" />
      </div>
      <div className="w-full h-fit flex flex-col gap-2">
        <span className="font-medium">GitHub</span>
        <Input className="w-full" placeholder="Укажите ссылку здесь" />
      </div>
      <div className="w-full h-fit flex items-center justify-end">
        <Button disabled>Сохранить</Button>
      </div>
    </div>
  )
}

export default page