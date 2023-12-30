import { bumAPI } from "@darkmaterial/api"
import { ShotCard } from "@darkmaterial/ui/widgets"

type Props = {
    params: {
        tag: string
    }
}
const TagsPage = async({ params }: Props) => {
    const shots = await bumAPI.shots.byTag(params.tag, 'popular')
    return shots.map(shot => <ShotCard key={shot.doc_id} shot={shot} />)
}

export default TagsPage