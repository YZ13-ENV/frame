import { user } from "@/api/user"
import Avatar from "@/components/shared/avatar"
import Link from "next/link"

type Props = {
    authorId: string
    visitorId: string
    statistics?: {
        views: number
        likes: number
    }
}
const ShotHeader = async({ authorId, visitorId, statistics={ likes: 0, views: 0 } }: Props) => {
    const author = await user.byId.short(authorId)
    const isYou = visitorId ? visitorId === authorId : false
    return (
        <div className="w-full h-fit flex flex-col border-y bg-card sticky top-0 z-20">
            <div className="w-full h-fit max-w-7xl mx-auto flex gap-4 view-wrapper-paddings">
                <div className="w-full h-20 flex items-center justify-between gap-4">
                    <div className="w-fit h-fit flex items-center gap-4">
                        {
                            author
                            ?
                            <Link href={'/' + (author.nickname ? author.nickname : authorId)} className="w-fit h-fit flex items-center gap-2">
                                <Avatar src={author.photoUrl} size={48}
                                isSubscriber={author.isSubscriber || false} />
                                <div className="w-fit h-full flex flex-col">
                                    <span className="text-lg font-semibold">{author.displayName}</span>
                                    <span className="text-sm text-muted-foreground">{author.position || author.email}</span>
                                </div>
                            </Link>
                            :
                            <Link href={'/' + authorId} className="w-fit h-fit flex items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-muted"></div>
                                <div className="w-fit h-full flex flex-col gap-1">
                                    <div className="w-36 h-6 rounded-md bg-muted"></div>
                                    <div className="w-24 h-4 rounded-md bg-muted"></div>
                                </div>
                            </Link>
                        }
                        {
                            isYou
                            ? null
                            : <button className="h-10 w-32 rounded-md bg-muted"></button>
                        }
                    </div>
                    <div className="w-fit h-fit flex items-center gap-4">
                        <div className="w-fit h-fit flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground">Просмотры</span>
                            <span className="text-2xl font-semibold">{statistics.views}</span>
                        </div>
                        <div className="w-fit h-fit flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground">Лайки</span>
                            <span className="text-2xl font-semibold">{statistics.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShotHeader