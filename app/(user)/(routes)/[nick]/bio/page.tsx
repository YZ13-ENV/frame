import { bum } from "@/api/bum"
import { user } from "@/api/user"
import AboutEditor from "@/app/(user)/_components/about-editor"
import { Input } from "@/components/ui/input"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Props = {
    params: {
        nick: string
    }
}
const page = async({ params }: Props) => {
    const byId = user.byId.short(params.nick)
    const byNickname = user.byNick.short(params.nick)
    const [dataById, dataByNickname] = await Promise.all([byId, byNickname])
    const author = dataByNickname ? dataByNickname : dataById 
    const isNickname = author ? params.nick === author.nickname : false
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const isYou = uid && author ? uid === author.uid : false
    const about = author ? await bum.author.getAbout(author.uid) : ''
    if (!isNickname && author && author.nickname) return redirect(`/${author.nickname}/bio`)
    return (
        <>
            <div className="w-full p-6 min-h-[17rem] rounded-t-2xl border-t border-x bg-card max-w-screen-2xl mx-auto">
                <div className="bio-wrapper">
                    <div className="about-wrapper">
                        {
                            isYou && author
                            ? <AboutEditor authorId={author.uid} defaultValue={about} />
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