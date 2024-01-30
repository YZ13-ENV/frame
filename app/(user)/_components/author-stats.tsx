import { team, bum } from 'api'

type Props = {
    authorId: string
    teamId?: string
}
const AuthorStats = async({ authorId, teamId }: Props) => {
    const likesPromise = teamId ? team.likes(teamId) : bum.author.likes(authorId)
    const followersPromise = bum.author.followers(authorId)
    const followingsPromise = teamId ? [] : bum.author.followings(authorId)
    const [likes, followings, followers] = await Promise.all([likesPromise, followingsPromise, followersPromise])
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <span className="text-sm text-muted-foreground">{followers.length} Подписчиков</span>
            { !teamId && <span className="text-sm text-muted-foreground">{followings.length} Подписок</span> }
            <span className="text-sm text-muted-foreground">{likes.length} Лайков</span>
        </div>
    )
}

export default AuthorStats