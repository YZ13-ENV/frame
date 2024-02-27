import { PortfolioConfig } from '@/helpers/getPortfolio'
import { bum, team } from 'api'

type Props = {
    type: PortfolioConfig['type']
    id: string
}
const AuthorStats = async ({ id, type }: Props) => {
    const likesPromise = type === 'team' ? team.likes(id) : bum.author.likes(id)
    const followersPromise = bum.author.followers(id)
    const followingsPromise = type === 'team' ? [] : bum.author.followings(id)
    const [likes, followings, followers] = await Promise.all([likesPromise, followingsPromise, followersPromise])
    return (
        <div className="flex items-center gap-2 w-fit h-fit mt-6">
            <span className="text-sm text-muted-foreground">{followers.length} Подписчиков</span>
            {type === 'user' && <span className="text-sm text-muted-foreground">{followings.length} Подписок</span>}
            <span className="text-sm text-muted-foreground">{likes.length} Лайков</span>
        </div>
    )
}

export default AuthorStats