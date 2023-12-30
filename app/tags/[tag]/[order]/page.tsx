import { bumAPI } from "@darkmaterial/api"
import { ShotCard } from "@darkmaterial/ui/widgets"

type Props = {
    params: {
        tag: string
        order: string
    }
}

const TagPage = async({ params }: Props) => {
    const shots = await bumAPI.shots.byTag(params.tag, params.order)
    return shots.map(shot => <ShotCard key={shot.doc_id} shot={shot} />)
}

export default TagPage