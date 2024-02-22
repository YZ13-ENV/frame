import { user } from "api"
import Avatar from "@/components/shared/avatar"
import Link from "next/link"

type Props = {
    authorId: string
    teamId?: string
    statistics?: {
        views: number
        likes: number
    }
}
const ShotHeader = async ({ authorId, teamId, statistics = { likes: 0, views: 0 } }: Props) => {
    const author = await user.byId.short(authorId)
    return (
        <div className="w-full h-fit flex flex-col border-y bg-background sticky top-0 z-20">
            <div className="w-full h-fit max-w-7xl mx-auto flex gap-4 view-wrapper-paddings">
                <div className="w-full h-16 flex items-center justify-between gap-4">
                    <div className="w-fit h-fit flex items-center gap-4">
                        {
                            author
                                ?
                                <Link href={'/' + (author.nickname ? author.nickname : authorId)} className="w-fit h-fit flex items-center gap-2">
                                    <Avatar src={author.photoUrl} size={42}
                                        isSubscriber={author.isSubscriber || false} />
                                    <div className="w-fit h-full flex flex-col">
                                        <span className="text-base font-semibold">{author.displayName}</span>
                                        {
                                            teamId
                                                ? <span className="text-xs text-muted-foreground">
                                                    Для команды <Link className="capitalize text-accent-foreground" href={`/${teamId}`}>{teamId}</Link>
                                                </span>
                                                : <span className="text-xs text-muted-foreground">{author.position || author.email}</span>
                                        }
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
                    </div>
                    <div className="w-fit h-fit flex items-center gap-4">
                        <div className="w-fit h-fit flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground">Просмотры</span>
                            <span className="text-xl font-semibold">{statistics.views}</span>
                        </div>
                        <div className="w-fit h-fit flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground">Лайки</span>
                            <span className="text-xl font-semibold">{statistics.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShotHeader