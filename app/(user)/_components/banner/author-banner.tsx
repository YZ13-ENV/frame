import AuthorBannerWrapper from "./author-banner-wrapper"
import AuthorInfo from "./author-info"
import PopularWork from "../popular-work"
import { PortfolioConfig } from "@/helpers/getPortfolio"


type Props = {
    portfolio: PortfolioConfig
}
const AuthorBanner = ({ portfolio }: Props) => {
    const id = portfolio.type === 'team' && portfolio.data
    ? portfolio.data.doc_id
    : portfolio.type === 'user' && portfolio.data
    ? portfolio.data.uid
    : null
    return (
        <AuthorBannerWrapper>
            <div className="author-banner-wrapper">
                <AuthorInfo portfolio={portfolio} />
                {
                    id &&
                    <div className="pinned-work-wrapper">
                        <PopularWork type={portfolio.type} id={id} />
                    </div>
                }
            </div>
        </AuthorBannerWrapper>
    )
}

export default AuthorBanner