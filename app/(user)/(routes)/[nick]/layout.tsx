import PortfolioNav from "../../_components/nav"
import AuthorBanner from "../../_components/banner/author-banner"
import HeaderSkeleton from "@/components/skeletons/header"
import Footer from "@/components/shared/footer"
import { getPortfolio } from "@/helpers/getPortfolio"
import { Suspense } from 'react'
import dynamic from "next/dynamic"
const Header = dynamic(() => import( "@/components/widgets/header"), {
    loading: () => <HeaderSkeleton />
})

type Props = {
    children: JSX.Element | JSX.Element[]
    params: {
        nick: string
    }
}
const layout = async({ children, params }: Props) => {
    const { nick } = params
    const portfolio = await getPortfolio(nick)
    const prefix = `/${nick}`
    if (!portfolio) return null
    return (
        <>
            <Suspense fallback={<HeaderSkeleton />}>
                <Header />
            </Suspense>
            <AuthorBanner portfolio={portfolio} />
            <div className="w-full py-2 border-b">
                <div className="mx-auto max-w-screen-2xl px-6">
                    <PortfolioNav layout={portfolio.type} prefix={prefix} />
                </div>
            </div>
            { children }
            <Footer />
        </>
    )
}

export default layout