import Avatar from "@/components/shared/avatar"
import { Button } from "@/components/ui/button"
import { ShortUserData } from "@/types/user"
import { BiDotsVerticalRounded } from "react-icons/bi"
import AuthorStats from "./author-stats"
import { Suspense } from "react"
import FollowButton from "./follow-button"
import { bum } from "@/api/bum"

type Props = {
    author: ShortUserData
    userId: string | null
}
const AuthorInfo = async({ author, userId }: Props) => {
    const isYou = author.uid === (userId || '')
    const followers = userId ? await bum.author.followings(userId) : []
    const isFollowed = followers.includes(author.uid)
    const signature = await bum.author.getSignature(author.uid)
    return (
        <div className="author-info-wrapper">
            <div className="flex items-center gap-4 w-fit h-fit">
                { author?.photoUrl && <Avatar src={author?.photoUrl} size={96} /> }
                <div className="flex flex-col justify-center h-full gap-2 w-fit">
                    <h1 className="text-4xl font-bold">{`@${author?.nickname || author?.displayName}`}</h1>
                    <span className="text-base text-muted-foreground">{author?.position || author?.email}</span>
                </div>
            </div>
            { signature && <span className="author-description">{signature}</span> }
            <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                <AuthorStats authorId={author.uid} />
            </Suspense>
            <div className="flex items-center gap-2 mt-2 w-fit h-fit">
                <FollowButton from={userId || ''} to={author.uid} defaultValue={isFollowed} />
                { !isYou && <Button disabled variant='outline'>Связаться</Button> }
                <Button disabled variant='ghost' size='icon'><BiDotsVerticalRounded /></Button>
            </div>
        </div>
    )
}

export default AuthorInfo