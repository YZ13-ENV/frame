'use client'

import { useAppSelector } from "@/components/entities/store/store"
import TextBlock from "./text-block"
import MediaBlock from "./media-block"

const ViewBlocks = () => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    return (
        <>
            {
                blocks.map((block, index) => {
                    if (block.type === 'text') return <TextBlock key={block.id + '-' + block.type + '-view'} block={block} index={index} />
                    if (block.type === 'media') return <MediaBlock key={block.id + '-' + block.type + '-view'} block={block} index={index} />
                    return null
                })
            }
        </>
    )
}

export default ViewBlocks