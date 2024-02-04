import { bum } from "@/api/bum"
import ShotCard from "@/components/shared/shot-card"
import ShotSkeleton from "@/components/skeletons/shot"
import { getVisitorId } from "@/helpers/cookies"
import { author_config, fetch_author } from "@/helpers/portfolio-fetcher"
import { redirect } from "next/navigation"
import { Suspense } from "react"

type Props = {
    params: {
        nick: string
    }
}
const page = async({ params }: Props) => {
    // TODO rewrite this like page.tsx in this layout
    const nickname = params.nick
    const visitorId = getVisitorId()
    const author = await fetch_author(nickname)
    const config = author ? author_config(author) : null
    const isYou = config && visitorId ? config.uid === visitorId : false
    const saved = config && config.data.type === 'user' ? await bum.author.saved(config.data.uid) : []
    const teamId = config && config.data.type === 'team' ? config.data.doc_id : undefined
    if (!isYou) redirect(`/${nickname}`)
    if (config && config.data.type === 'team') return redirect(`/${nickname}`)
    if (
        config && config.isNickname && author && config.data.type === 'user' && config.data.nickname && !teamId
        && nickname !== config.data.nickname
    ) return redirect(`/${config.data.nickname}/saved`)
    return (
        <>
            <div className="w-full px-6 min-h-[17rem] py-24 max-w-screen-2xl mx-auto">
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