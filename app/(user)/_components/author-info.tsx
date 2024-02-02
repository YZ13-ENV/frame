import Avatar from "@/components/shared/avatar"
import { Button } from "@/components/ui/button"
import { BiDotsVerticalRounded } from "react-icons/bi"
import AuthorStats from "./author-stats"
import { Suspense } from "react"
import FollowButton from "./follow-button"
import { bum } from "@/api/bum"
import SignatureEditor from "./signature-editor"
import type { AuthorInfo as AuthorInfoConfig } from "../(routes)/[nick]/layout"

type Props = {
    author: AuthorInfoConfig
    userId: string | null
    teamId?: string
}
const AuthorInfo = async({ author, userId, teamId }: Props) => {
    const isYou = author.uid === (userId || '')
    const followers = userId ? await bum.author.followings(userId) : []
    const isFollowed = followers.includes(author.uid)
    const signature = author.signature ? author.signature : await bum.author.getSignature(author.uid)
    return (
        <div className="author-info-wrapper">
            <div className="flex items-center gap-4 w-fit h-fit">
                { author.photoURL && <Avatar src={author.photoURL} size={96} /> }
                <div className="flex flex-col justify-center h-full gap-2 w-fit">
                    <h1 className="text-4xl font-bold">{`${author.name}`}</h1>
                    {
                        author.type === 'team'
                        ? <span className="text-base text-muted-foreground">Команда</span>
                        : author.position && <div className="w-fit h-fit flex items-center gap-2">
                            <span className="text-xs px-3 py-1 rounded-full text-muted-foreground bg-muted border">{ teamId || 'ID-команды' }</span>
                            <span className="text-base text-muted-foreground">{author.position}</span>
                        </div>
                    }
                </div>
            </div>
            <SignatureEditor signature={signature} readOnly={!isYou} authorId={author.uid} />
            <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                <AuthorStats authorId={author.uid} teamId={teamId} />
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