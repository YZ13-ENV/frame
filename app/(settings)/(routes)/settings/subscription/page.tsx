import { user } from "api"
import SubscriptionAbility from "@/app/(settings)/_components/subscription/subscription-ability"
import { Separator } from "@/components/ui/separator"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const page = async () => {
  const cookiesList = cookies()
  const visitorIdCookie = cookiesList.get('uid')
  const visitorId = visitorIdCookie ? visitorIdCookie.value : null
  const author = visitorId ? await user.byId.short(visitorId) : null
  const isSubscriber = author ? author.isSubscriber : false
  if (!visitorId || !author) return redirect('/shots/popular')
  return (
    <div className='w-full h-fit py-6'>
      <span className="text-base">Подписка: {isSubscriber ? "Активна" : "Неактивна"}</span>
      <div className="w-full h-fit flex flex-col gap-2 my-4">
        <span className="text-xl font-semibold">Возможности подписки</span>
        <span className="text-sm text-muted-foreground">
          Со временем возможностей станет больше.
        </span>
      </div>
      <div className="w-full h-fit flex flex-col gap-4 mt-4 p-4 rounded-lg border">
        <SubscriptionAbility
          title="Отключить рекламу"
          description="Отключить рекламу по всему приложению"
          checked={isSubscriber}
          disabled={true}
        />
        <Separator />
        <SubscriptionAbility
          title="Расширить ограничения"
          description="Больше медиа-блоков в конструкторе + возможность загружать видео в медиа-блоки"
          checked={isSubscriber}
          disabled={true}
        />
      </div>
    </div>
  )
}

export default page