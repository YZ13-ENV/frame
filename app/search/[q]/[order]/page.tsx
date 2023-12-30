import { bumAPI } from '@darkmaterial/api'
import { ShotCard } from '@darkmaterial/ui/widgets'
// import React from 'react'

type Props = {
    params: {
        order: string
        q: string
    }
}

const SearchShotsWithOrder = async({ params }: Props) => {
    const shots = await bumAPI.shots.search(params.q, params.order)
    return shots.map(shot => <ShotCard key={shot.doc_id} shot={shot} />)
}

export default SearchShotsWithOrder