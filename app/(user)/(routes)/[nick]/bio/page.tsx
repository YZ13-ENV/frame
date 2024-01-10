import { bum } from "@/api/bum"
import { user } from "@/api/user"
import AuthorBannerWrapper from "@/app/(user)/_components/author-banner-wrapper"
import AuthorInfo from "@/app/(user)/_components/author-info"
import PortfolioNav from "@/app/(user)/_components/nav"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
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
    const popular = author ? bum.shot.getPopularOne(author.uid) : null
    const path = isNickname && author ? `/${author.nickname}` : `/${params.nick}`
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    if (!isNickname && author && author.nickname) return redirect(`/${author.nickname}/bio`)
    return (
        <>
            <AuthorBannerWrapper>
                <div className="author-banner-wrapper">
                    { author && <AuthorInfo author={author} userId={uid || ''} /> }
                    <div className="pinned-work-wrapper">
                        {
                            popular &&
                            <div className="pinned-work"></div>
                        }
                    </div>
                </div>
            </AuthorBannerWrapper>
            <div className="w-full px-6 mx-auto max-w-screen-2xl">
                <PortfolioNav path={path} value="3" />
            </div>
            <div className="bio-wrapper">
                <div className="about-wrapper">
                    <span>Расскажите о себе</span>
                </div>
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
            </div>
        </>
    )
}

export default page