import HeaderSkeleton from "@/components/skeletons/header"
import Footer from "@/components/shared/footer"
import { getPortfolio } from "@/helpers/getPortfolio"
import { Suspense } from 'react'
import dynamic from "next/dynamic"
import { Metadata } from "next"
import AuthorBannerWrapper from "../../_components/banner/author-banner-wrapper"
import { bum } from "api"
import Author from "../../_components/banner/author"
import SignatureEditor from "../../_components/signature-editor"
import AuthorStats from "../../_components/banner/author-stats"
import DynamicNav from "../../_components/dynamic-nav"
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
const layout = async ({ children, params }: Props) => {
    const { nick } = params
    const portfolio = await getPortfolio(nick)
    const signature = portfolio.type === 'team' && portfolio.data
        ? portfolio.data.signature :
        portfolio.type === 'user' && portfolio.data
            ? await bum.author.getSignature(portfolio.data.uid)
            : ''
    const name = portfolio.type === 'team' && portfolio.data ? portfolio.data.name : portfolio.type === 'user' && portfolio.data ? portfolio.data.displayName : 'Не указано'
    const photoURL = portfolio.type === 'team' && portfolio.data ? portfolio.data.photoURL || '' : portfolio.type === 'user' && portfolio.data ? portfolio.data.photoUrl : ''
    const prefix = `/${nick}`
    return (
        <>
            {/* <div className="w-full bg-card"> */}
            <Suspense fallback={<HeaderSkeleton />}>
                <Header transparent={false} />
            </Suspense>
            <AuthorBannerWrapper>
                <></>
                {
                    (portfolio.type === 'team' && portfolio.data) ?
                        <>
                            <Author portfolio={portfolio} />
                            <SignatureEditor signature={signature} readOnly={true} id={portfolio.data.doc_id} />
                            <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                                <AuthorStats type={portfolio.type} id={portfolio.data.doc_id} />
                            </Suspense>
                        </>
                        : (portfolio.type === 'user' && portfolio.data) ?
                            <>
                                <Author portfolio={portfolio} />
                                <SignatureEditor signature={signature} readOnly={portfolio.current ? portfolio.current.uid !== portfolio.data.uid : true} id={portfolio.data.uid} />
                                <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                                    <AuthorStats type={portfolio.type} id={portfolio.data.uid} />
                                </Suspense>
                            </>
                            : <></>
                }
            </AuthorBannerWrapper>
            <DynamicNav layout={portfolio.type} prefix={prefix} user={{ name: name, photoURL: photoURL }} />
            {/* </div> */}
            {children}
            <Footer className="max-w-screen-2xl p-6" />
        </>
    )
}

export default layout