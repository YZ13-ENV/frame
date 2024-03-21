import { who } from "@/api/who"
import ShotSkeleton from "@/components/skeletons/shot"
import { getVisitorId } from "@/helpers/cookies"
import { bum, team } from "@darkmaterial/api"
import dynamic from "next/dynamic"
import { notFound, redirect } from "next/navigation"
const AdvancedChunk = dynamic(() => import("@/components/widgets/chunk"), {
    loading: () => <div className="z-20 grid w-full h-full gap-6 shots_grid">
        <ShotSkeleton />
        <ShotSkeleton />
        <ShotSkeleton />
        <ShotSkeleton />
        <ShotSkeleton />
        <ShotSkeleton />
    </div>
})
type Props = {
    params: {
        nick: string
    }
}
const page = async ({ params }: Props) => {
    const { nick } = params
    const visitor = getVisitorId()
    const portfolio = await who(nick, visitor || undefined)
    if (!portfolio) return notFound()
    const teamId = portfolio.type === 'team' && portfolio.data ? portfolio.data.doc_id : null
    if (portfolio.type === 'user' && portfolio.data && portfolio.data.nickname && portfolio.data.nickname !== nick)
        return redirect(`/${portfolio.data.nickname}`)
    if (portfolio.type === 'team') return (
        <div className="w-full min-h-[17rem] px-6 max-w-screen-2xl mx-auto my-12">
            {
                teamId &&
                <div className="z-20 grid w-full h-full gap-6 shots_grid">
                    <AdvancedChunk getter={team.shots.all(teamId)} />
                </div>
            }
        </div>
    )
    return (
        <div className="w-full min-h-[17rem] px-6 max-w-screen-2xl mx-auto my-12">
            {
                portfolio && portfolio.data &&
                <div className="z-20 grid w-full h-full gap-6 shots_grid">
                    <AdvancedChunk getter={bum.shots.byUser(portfolio.data.uid, 'new')} />
                </div>
            }
        </div>
    )
}

export default page