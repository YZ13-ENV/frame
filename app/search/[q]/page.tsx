import { bumAPI } from '@darkmaterial/api'
import { ShotCard } from '@darkmaterial/ui/widgets'

type Props = {
    params: {
        q: string | null,
    }
}

const SearchPage = async({ params }: Props) => {
    const shots = await bumAPI.shots.search(params.q, 'popular')
    return shots.map(shot => <ShotCard key={shot.doc_id} shot={shot} />)
}

export default SearchPage