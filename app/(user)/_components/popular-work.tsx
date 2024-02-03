import ShotCard from "@/components/shared/shot-card"
import { PortfolioConfig } from "@/helpers/getPortfolio"
import { bum, team } from "api"

type Props = {
    type: PortfolioConfig['type']
    id: string
}
const PopularWork = async({ id, type }: Props) => {
    const shot = type === 'team'
    ? await team.mostPopularShot(id)
    : type === 'user'
    ? await bum.author.mostPopularShot(id)
    : null
    if (!shot) return null
    return (
        <div className="pinned-work">
            <ShotCard key={'popular-' + shot.doc_id} shot={shot} enableFooter={false} />
        </div>
    )
}

export default PopularWork