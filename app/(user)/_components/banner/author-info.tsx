import type { PortfolioConfig } from "@/helpers/getPortfolio"
import Author from "./author"
import SignatureEditor from "../signature-editor"
import AuthorStats from "./author-stats"
import { Suspense } from "react"
import { bum } from "api"

type Props = {
    portfolio: PortfolioConfig
}
const AuthorInfo = async ({ portfolio }: Props) => {
    const signature = portfolio.type === 'team' && portfolio.data ? portfolio.data.signature : portfolio.type === 'user' && portfolio.data ? await bum.author.getSignature(portfolio.data.uid) : ''
    if (portfolio.type === 'team' && portfolio.data) return (
        <>
            <Author portfolio={portfolio} />
            <SignatureEditor signature={signature} readOnly={true} id={portfolio.data.doc_id} />
            <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                <AuthorStats type={portfolio.type} id={portfolio.data.doc_id} />
            </Suspense>

        </>
    )
    if (portfolio.type === 'user' && portfolio.data) return (
        <>
            <Author portfolio={portfolio} />
            <SignatureEditor signature={signature} readOnly={portfolio.current ? portfolio.current.uid !== portfolio.data.uid : true} id={portfolio.data.uid} />
            <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                <AuthorStats type={portfolio.type} id={portfolio.data.uid} />
            </Suspense>

        </>
    )
    return <></>
}
{/* <div className="flex items-center gap-2 mt-2 w-fit h-fit"> */ }
{/* <FollowButton from={userId || ''} to={author.uid} defaultValue={isFollowed} /> */ }
{/* { !isYou && <Button disabled variant='outline'>Связаться</Button> } */ }
{/* <Button disabled variant='ghost' size='icon'><BiDotsVerticalRounded /></Button> */ }
{/* </div> */ }

export default AuthorInfo