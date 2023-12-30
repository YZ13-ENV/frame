'use client'
import { useAppSelector } from '@/components/entities/store/store'
import TextBlock from './Blocks/TextBlock'
import MediaUploader from './Tools/MediaUploader'
import Separator from './Blocks/Separator'
import Sticker from './Blocks/Sticker'
// import React from 'react'

const Blocks = () => {
    const draft = useAppSelector(state => state.uploader.draft.draft)
    /* 
        limits for blocks -
        text +
        media +
        separator +
        gallery -
        sticker -
    */ 
    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto gap-14 h-fit">
            {
                draft.blocks.map((block, index) => {
                    if (block.type === 'text') return <TextBlock key={`#block${index}`} index={index} block={block} />
                    if (block.type === 'image' || block.type === 'video') return <MediaUploader key={`#block${index}`} rootBlock={false} block={block} index={index} />
                    if (block.type === 'separator') return <Separator key={`#block${index}`} index={index} block={block} />
                    if (block.type === 'sticker') return <Sticker key={`#block${index}`} index={index} block={block} />
                    return <span key={index + block.type}>{block.type}</span>
                })
            }
        </div>
    )
}

export default Blocks