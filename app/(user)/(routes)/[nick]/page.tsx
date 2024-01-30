import { bum } from "@/api/bum"
import AdvancedChunk from "@/components/widgets/chunk"
import { author_config, fetch_author } from "@/helpers/portfolio-fetcher"
import { team } from "api"
import { redirect } from "next/navigation"

type Props = {
    params: {
        nick: string
    }
}
const page = async({ params }: Props) => {
    const nick = params.nick
    const author = await fetch_author(nick)
    const config = author ? author_config(author) : null
    const teamId = (config && config.data.type === 'team' && config.data.doc_id) || null
    if (
        config && config.isNickname && author && config.data.type === 'user' && config.data.nickname && !teamId
        && nick !== config.data.nickname
    ) return redirect(`/${config.data.nickname}`)
    return (
        <>
            <div className="w-full p-6 min-h-[17rem] rounded-t-2xl border-t border-x bg-card max-w-screen-2xl mx-auto">
                {
                    config && config.uid &&
                    <div className="z-20 grid w-full h-full gap-6 shots_grid">
                        <AdvancedChunk getter={
                            teamId
                            ? team.shots.all(teamId)
                            : bum.shots.byUser(config.uid, 'new')
                        } />
                    </div>
                }
            </div>
        </>
    )
}

export default page