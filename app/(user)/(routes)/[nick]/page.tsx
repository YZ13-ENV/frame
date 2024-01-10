import { user } from "@/api/user"
import { Suspense } from "react"
import Loading from '@/app/(shots)/(routes)/shots/[order]/loading'
import AdvancedChunk from "@/components/widgets/chunk"
import { bum } from "@/api/bum"
import { redirect } from "next/navigation"
import PortfolioNav from "../../_components/nav"
import AuthorInfo from "../../_components/author-info"
import AuthorBannerWrapper from "../../_components/author-banner-wrapper"
import { cookies } from "next/headers"

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
    if (!isNickname && author && author.nickname) return redirect(`/${author.nickname}`)
    return (
        <>
            <AuthorBannerWrapper>
                <div className="author-banner-wrapper">
                    { author && <AuthorInfo author={author} userId={uid} /> }
                    <div className="pinned-work-wrapper">
                        {
                            popular &&
                            <div className="pinned-work"></div>
                        }
                    </div>
                </div>
            </AuthorBannerWrapper>
            <div className="w-full px-6 mx-auto max-w-screen-2xl">
                <PortfolioNav path={path} value="1" />
            </div>
            <div className="w-full py-12 lg:px-24 md:px-12 px-6 min-h-[17rem]">
                {
                    author && author.uid &&
                    <Suspense fallback={ <Loading /> }>
                        <div className="z-20 grid w-full h-full gap-6 shots_grid">
                            <AdvancedChunk getter={ bum.shots.byUser } uid={author.uid} />
                        </div>
                    </Suspense>
                }
            </div>
        </>
    )
}

export default page