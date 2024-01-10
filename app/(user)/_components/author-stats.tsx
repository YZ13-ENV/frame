import { bum } from "@/api/bum"

type Props = {
    authorId: string
}
const AuthorStats = async({ authorId }: Props) => {
    const likesPromise = bum.author.likes(authorId)
    const followersPromise = bum.author.followers(authorId)
    const followingsPromise = bum.author.followings(authorId)
    const [likes, followers, followings] = await Promise.all([likesPromise, followersPromise, followingsPromise])
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <span className="text-sm text-muted-foreground">{followers.length} Подписчиков</span>
            <span className="text-sm text-muted-foreground">{followings.length} Подписок</span>
            <span className="text-sm text-muted-foreground">{likes.length} Лайков</span>
        </div>
    )
}

export default AuthorStats