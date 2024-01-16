import { user } from "@/api/user"
import Loading from "@/app/(shots)/(routes)/shots/[order]/loading"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Props = {
    params: {
        nick: string
    }
}
const page = async({ params }: Props) => {
    const nickname = params.nick
    const byId = user.byId.short(nickname)
    const byNickname = user.byNick.short(nickname)
    const [dataById, dataByNickname] = await Promise.all([byId, byNickname])
    const author = dataByNickname ? dataByNickname : dataById
    const isNickname = author ? nickname === author.nickname : false
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const visitorId = uidCookie ? uidCookie.value : null
    const isYou = visitorId && author ? visitorId === author.uid : false
    if (!isYou) redirect(`/${nickname}`)
    if (!isNickname && author && author.nickname) return redirect(`/${author.nickname}/saved`)
    return (
        <>
            <div className="w-full p-6 min-h-[17rem] rounded-t-2xl border-t border-x bg-card max-w-screen-2xl mx-auto">
                <Loading />
            </div>
        </>
    )
}

export default page