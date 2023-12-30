import AdvancedChunk from '@/components/widgets/Chunks/ShotsChunk'
import { bumAPI } from "@darkmaterial/api"
// import React from 'react'
// import Chunk from '../Chunk'

type Props = {
    params: {
        order: string
    }
}
const OrderPage = ({ params }: Props) => {
    return (
        <AdvancedChunk getter={ bumAPI.shots.all } props={{ order: params.order }} />
    )
}

export default OrderPage