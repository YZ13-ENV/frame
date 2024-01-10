'use client'

import { useAppSelector } from "@/components/entities/store/store"
import TextBlock from "./text-block"

const ViewBlocks = () => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    return (
        <>
            {
                blocks.map((block, index) => {
                    if (block.type === 'text') return <TextBlock key={block.id + '-' + block.type + '-view'} block={block} index={index} />
                    if (block.type === 'media') return <div key={block.id + '-' + block.type + '-view'} className="w-full aspect-[4/3] rounded-xl bg-card"/>
                    return null
                })
            }
        </>
    )
}

export default ViewBlocks