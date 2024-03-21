import { who } from "@/api/who"
import Footer from "@/components/shared/footer"
import HeaderSkeleton from "@/components/skeletons/header"
import PortfolioLayoutSkeleton from "@/components/skeletons/portfolio-layout"
import { getVisitorId } from "@/helpers/cookies"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from 'react'
const PortfolioLayout = dynamic(() => import("../../_components/portfolio-layout"), {
    loading: () => <PortfolioLayoutSkeleton />
})
const Header = dynamic(() => import("@/components/widgets/header"), {
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
    const portfolio = await who(nick)
    if (!portfolio) return {
        title: "Не найдено"
    }
    const title = portfolio.type === 'team' && portfolio.data
        ? portfolio.data.name
        : portfolio.type === 'user' && portfolio.data
            ? portfolio.data.nickname || portfolio.data.displayName
            : 'Не найдено'
    return {
        title: title
    }
}
const layout = async ({ children, params }: Props) => {
    const { nick } = params
    const visitor = getVisitorId()
    return (
        <>
            <Suspense fallback={<HeaderSkeleton transparent={false} />}>
                <Header transparent={false} />
            </Suspense>
            {/* <Skeleton></Skeleton> */}
            <Suspense fallback={<PortfolioLayoutSkeleton />}>
                <PortfolioLayout nick={nick} visitor={visitor || undefined} />
            </Suspense>
            {children}
            <Footer className="max-w-screen-2xl p-6" />
        </>
    )
}

export default layout