import { bum } from "@/api/bum"
import { user } from "@/api/user"
import ShotCard from "@/components/shared/shot-card"
import ShotSkeleton from "@/components/skeletons/shot"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"

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
    const saved = author ? await bum.author.saved(author.uid) : []
    if (!isYou) redirect(`/${nickname}`)
    if (!isNickname && author && author.nickname) return redirect(`/${author.nickname}/saved`)
    return (
        <>
            <div className="w-full p-6 min-h-[17rem] rounded-t-2xl border-t border-x bg-card max-w-screen-2xl mx-auto">
                <div className="z-20 grid w-full h-full gap-6 shots_grid">
                    {
                        saved.map(shot =>
                            <Suspense key={shot.doc_id} fallback={<ShotSkeleton />}><ShotCard shot={shot} /></Suspense>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default page