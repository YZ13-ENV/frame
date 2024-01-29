import { DocShotData } from "@/types/shot"
import AuthorBannerWrapper from "./author-banner-wrapper"
import AuthorInfo from "./author-info"
import PopularWork from "./popular-work"
import type { AuthorInfo as AuthorInfoConfig } from "../(routes)/[nick]/layout"


type Props = {
    visitorId: string
    author: AuthorInfoConfig
    popularShot: DocShotData | null
}
const AuthorBanner = ({ author, visitorId, popularShot }: Props) => {
    return (
        <AuthorBannerWrapper>
            <div className="author-banner-wrapper">
                { author && <AuthorInfo author={author} userId={visitorId} /> }
                <div className="pinned-work-wrapper">
                    {
                        popularShot &&
                        <PopularWork shot={popularShot} />
                    }
                </div>
            </div>
        </AuthorBannerWrapper>
    )
}

export default AuthorBanner