import { Button } from "@/components/ui/button"
import { BiDotsVerticalRounded } from "react-icons/bi"
import AuthorStats from "./author-stats"
import { Suspense } from "react"
import FollowButton from "../follow-button"
import { bum } from "@/api/bum"
import SignatureEditor from "../signature-editor"
import Author from "./author"
import { PortfolioConfig } from "@/helpers/getPortfolio"

type Props = {
    portfolio: PortfolioConfig
}
const AuthorInfo = async({ portfolio }: Props) => {
    // const isYou = author.uid === (userId || '')
    // const signature = author.signature ? author.signature : await bum.author.getSignature(author.uid)
    // const followers = userId ? await bum.author.followings(userId) : []
    // const isFollowed = followers.includes(author.uid)
    if (portfolio.type === 'team' && portfolio.data) return (
        <div className="author-info-wrapper">
            <Author portfolio={portfolio} />
            <SignatureEditor signature={portfolio.data.signature} readOnly={portfolio.relations === 'visitor'} id={portfolio.data.doc_id} />
            <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                <AuthorStats type={portfolio.type} id={portfolio.data.doc_id} />
            </Suspense>
            <div className="flex items-center gap-2 mt-2 w-fit h-fit">
                {/* <FollowButton from={userId || ''} to={author.uid} defaultValue={isFollowed} /> */}
                {/* { !isYou && <Button disabled variant='outline'>Связаться</Button> } */}
                {/* <Button disabled variant='ghost' size='icon'><BiDotsVerticalRounded /></Button> */}
            </div>
        </div>
    )
    if (portfolio.type === 'user' && portfolio.data) return (
        <div className="author-info-wrapper">
            <Author portfolio={portfolio} />
            <SignatureEditor signature={await bum.author.getSignature(portfolio.data?.uid)} readOnly={portfolio.current?.uid !== portfolio.data?.uid} id={portfolio.data?.uid} />
            <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                <AuthorStats type={portfolio.type} id={portfolio.data.uid} />
            </Suspense>
            <div className="flex items-center gap-2 mt-2 w-fit h-fit">
                {/* <FollowButton from={portfolio.current?.ui || ''} to={portfolio.data?.uid} defaultValue={isFollowed} /> */}
                {/* { !isYou && <Button disabled variant='outline'>Связаться</Button> } */}
                {/* <Button disabled variant='ghost' size='icon'><BiDotsVerticalRounded /></Button> */}
            </div>
        </div>
    )
    return null
}

export default AuthorInfo