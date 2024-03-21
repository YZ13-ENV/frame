import { who } from "@/api/who"
import { getVisitorId } from "@/helpers/cookies"
import { bum } from "@darkmaterial/api"
import { notFound } from "next/navigation"

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
    const about = portfolio.type === 'team' && portfolio.data
        ? portfolio.data.about || ''
        : portfolio.type === 'user' && portfolio.data
            ? await bum.author.getAbout(portfolio.data.uid)
            : ''
    return (
        <>
            <div className="w-full px-6 min-h-[27rem] py-24 max-w-screen-2xl mx-auto">
                <div className="bio-wrapper">
                    <div className="about-wrapper">
                        <span className="text-base">{about}</span>
                    </div>
                    {
                        // isYou &&
                        // <div className="links-wrapper">
                        // <div className="w-full h-fit flex flex-col gap-2">
                        // <span className="text-sm text-muted-foreground">Ссылка</span>
                        // <Input placeholder="Укажите ссылку..." />
                        // </div>
                        // <div className="w-full h-fit flex flex-col gap-2">
                        // <span className="text-sm text-muted-foreground">Ссылка</span>
                        // <Input placeholder="Укажите ссылку..." />
                        // </div>
                        // </div>
                    }
                </div>
            </div>
        </>
    )
}

export default page