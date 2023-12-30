'use client'
import { useAppSelector } from '@/components/entities/store/store'
// import React from 'react'
import { StickerMenuBlock } from '../../Blocks/Sticker'
import MediaBlock from '../../MenuBlocks/MediaBlock'
import SeparatorBlock from '../../MenuBlocks/SeparatorBlock'
import TextBlock from '../../MenuBlocks/TextBlock'
import DraftBlockContext from '../../Tools/DraftBlockContext'
import Sortable from './Sortable'

const DraftBlocks = () => {
    const draft = useAppSelector(state => state.uploader.draft.draft)
    const items = draft.blocks
    return (
        <DraftBlockContext items={items.map((_, index) => ({ id: index + 1 }))}>
            <div className="flex flex-col w-full max-h-full gap-2 overflow-y-auto h-fit">
                {
                    draft.blocks.map((block, index) => {
                        if (block.type === 'sticker') return <Sortable key={index + block.type} block={block} index={index}>
                            <StickerMenuBlock key={index + block.type} block={block} index={index} />
                        </Sortable>
                        if (block.type === 'image' || block.type === 'video') return <Sortable key={index + block.type} block={block} index={index}>
                            <MediaBlock key={index + block.type} block={block} index={index} />
                        </Sortable>
                        if (block.type === 'separator') return <Sortable key={index + block.type} block={block} index={index}>
                            <SeparatorBlock key={index + block.type} block={block} index={index} />
                        </Sortable>
                        if (block.type === 'text') return <Sortable key={index + block.type} block={block} index={index}>
                            <TextBlock key={index + block.type} block={block} index={index} />
                        </Sortable>
                        return <span key={index + block.type}>{block.type}</span>
                    })
                }
            </div>
        </DraftBlockContext>
    )
}

export default DraftBlocks