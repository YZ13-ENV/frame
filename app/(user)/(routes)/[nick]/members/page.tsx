import { getVisitorId } from "@/helpers/cookies"
import { author_config, fetch_author } from "@/helpers/portfolio-fetcher"
import { redirect } from "next/navigation"

type Props = {
    params: {
        nick: string
    }
}
const page = async({ params }: Props) => {
    const nickname = params.nick
    const visitorId = getVisitorId()
    const author = await fetch_author(nickname)
    const config = author ? author_config(author) : null
    const isYou = config && visitorId ? config.uid === visitorId : false
    const teamId = config && config.data.type === 'team' ? config.data.doc_id : undefined
    if (!isYou) redirect(`/${nickname}`)
    if (config && config.data.type === 'user' && config.data.teamId === nickname) return redirect(`/${nickname}`)
    if (
        config && config.isNickname && author && config.data.type === 'user' && config.data.nickname && !teamId
        && nickname !== config.data.nickname
    ) return redirect(`/${config.data.nickname}/members`)
    return (
        <div className="w-full px-6 min-h-[17rem] py-24 max-w-screen-2xl mx-auto">
        </div>
    )
}

export default page