import ShotSkeleton from "@/components/skeletons/shot"
import { getPortfolio } from "@/helpers/getPortfolio"
import { bum, team } from "api"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"
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
    const portfolio = await getPortfolio(nick)
    const teamId = portfolio.type === 'team' && portfolio.data ? portfolio.data.doc_id : null
    if (portfolio.type === 'user' && portfolio.data && portfolio.data.nickname && portfolio.data.nickname !== nick)
        return redirect(`/${portfolio.data.nickname}`)
    if (portfolio.type === 'team') return (
        <div className="w-full min-h-[17rem] px-6 max-w-screen-2xl mx-auto my-24">
            {
                teamId &&
                <div className="z-20 grid w-full h-full gap-6 shots_grid">
                    <AdvancedChunk getter={team.shots.all(teamId)} />
                </div>
            }
        </div>
    )
    return (
        <div className="w-full min-h-[17rem] px-6 max-w-screen-2xl mx-auto my-24">
            {
                portfolio && portfolio.data && portfolio.data.uid &&
                <div className="z-20 grid w-full h-full gap-6 shots_grid">
                    <AdvancedChunk getter={bum.shots.byUser(portfolio.data.uid, 'new')} />
                </div>
            }
        </div>
    )
}

export default page