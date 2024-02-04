import PortfolioNav from "../../_components/nav"
import HeaderSkeleton from "@/components/skeletons/header"
import Footer from "@/components/shared/footer"
import { getPortfolio } from "@/helpers/getPortfolio"
import { Suspense } from 'react'
import dynamic from "next/dynamic"
import { Metadata } from "next"
import AuthorBannerWrapper from "../../_components/banner/author-banner-wrapper"
import AuthorInfo from "../../_components/banner/author-info"
const Header = dynamic(() => import( "@/components/widgets/header"), {
    loading: () => <HeaderSkeleton />
})

type Props = {
    children: JSX.Element | JSX.Element[]
    params: {
        nick: string
    }
}
export async function generateMetadata({ params }: { params: { nick: string } }): Promise<Metadata> {
    const { nick } = params
    const portfolio = await getPortfolio(nick)
    const title = portfolio.type === 'team' && portfolio.data
    ? portfolio.data.name
    : portfolio.type === 'user' && portfolio.data
    ? portfolio.data.nickname || portfolio.data.displayName
    : 'Не найдено'
    return {
        title: title
    }
}
const layout = async({ children, params }: Props) => {
    const { nick } = params
    const portfolio = await getPortfolio(nick)
    const prefix = `/${nick}`
    return (
        <>
            <div className="w-full bg-card">
                <Suspense fallback={<HeaderSkeleton />}>
                    <Header />
                </Suspense>
                <AuthorBannerWrapper>
                    <AuthorInfo portfolio={portfolio} />
                </AuthorBannerWrapper>
                <div className="w-full py-2 border-b">
                    <div className="mx-auto max-w-screen-2xl px-6">
                        <PortfolioNav layout={portfolio.type} prefix={prefix} />
                    </div>
                </div>
            </div>
            { children }
            <Footer />
        </>
    )
}

export default layout