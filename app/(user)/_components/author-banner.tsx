import { DocShotData } from "@/types/shot"
import AuthorBannerWrapper from "./author-banner-wrapper"
import { ShortUserData } from "@/types/user"
import AuthorInfo from "./author-info"
import PopularWork from "./popular-work"


type Props = {
    visitorId: string
    authorId: string
    author: ShortUserData | null
    popularShot: DocShotData | null
}
const AuthorBanner = ({ authorId, author, visitorId, popularShot }: Props) => {
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