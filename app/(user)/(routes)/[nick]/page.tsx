import { bum } from "@/api/bum"
import AdvancedChunk from "@/components/widgets/chunk"
import { getPortfolio } from "@/helpers/getPortfolio"
import { team } from "api"
import { redirect } from "next/navigation"

type Props = {
    params: {
        nick: string
    }
}
const page = async({ params }: Props) => {
    const { nick } = params
    const portfolio = await getPortfolio(nick)
    const teamId = portfolio.type === 'team' && portfolio.data ? portfolio.data.doc_id : null
    if ( portfolio.type === 'user' && portfolio.data && portfolio.data.nickname && portfolio.data.nickname !== nick )
    return redirect(`/${portfolio.data.nickname}`)
    if (portfolio.type === 'team') return (
        <div className="w-full p-6 min-h-[17rem] rounded-t-2xl border-t border-x bg-card max-w-screen-2xl mx-auto">
            {
                teamId &&
                <div className="z-20 grid w-full h-full gap-6 shots_grid">
                    <AdvancedChunk getter={team.shots.all(teamId)} />
                </div>
            }
        </div>
    )
    return (
        <div className="w-full p-6 min-h-[17rem] rounded-t-2xl border-t border-x bg-card max-w-screen-2xl mx-auto">
            {
                portfolio && portfolio.data && portfolio.data.uid &&
                <div className="z-20 grid w-full h-full gap-6 shots_grid">
                    <AdvancedChunk getter={ bum.shots.byUser(portfolio.data.uid, 'new') } />
                </div>
            }
        </div>
    )
}

export default page