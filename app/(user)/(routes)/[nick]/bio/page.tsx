import { bum } from "@/api/bum"
import AboutEditor from "@/app/(user)/_components/about-editor"
import { Input } from "@/components/ui/input"
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
    const about = config && config.data.type === 'user' ? await bum.author.getAbout(config.data.uid) : ''
    if (!isYou) redirect(`/${nickname}`)
    if (
        config && config.isNickname && author && config.data.type === 'user' && config.data.nickname && !teamId
        && nickname !== config.data.nickname
    ) return redirect(`/${config.data.nickname}/bio`)
    return (
        <>
            <div className="w-full p-6 min-h-[17rem] rounded-t-2xl border-t border-x bg-card max-w-screen-2xl mx-auto">
                <div className="bio-wrapper">
                    <div className="about-wrapper">
                        {
                            isYou && teamId
                            ? <AboutEditor authorId={teamId} defaultValue={about} />
                            : <span className="text-sm">{about}</span>
                        }
                    </div>
                    {
                        isYou &&
                        <div className="links-wrapper">
                            <div className="w-full h-fit flex flex-col gap-2">
                                <span className="text-sm text-muted-foreground">Ссылка</span>
                                <Input placeholder="Укажите ссылку..." />
                            </div>
                            <div className="w-full h-fit flex flex-col gap-2">
                                <span className="text-sm text-muted-foreground">Ссылка</span>
                                <Input placeholder="Укажите ссылку..." />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default page