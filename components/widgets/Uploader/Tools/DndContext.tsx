'use client'
import { ReactNode } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import type { StickerBlock } from '@darkmaterial/core/types'
import { setBlocks } from '@/components/entities/uploader/draft'

type Props = {
    children: ReactNode
}
const LocalDndContext = ({ children }: Props) => {
    const dispatch = useAppDispatch()
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const onDragEnd = (e: DragEndEvent) => {
        // console.log(e)
        if (e.active) {
            const index = e.active.id as number - 1
            const providedBlock = e.active.data.current.block as StickerBlock
            const updatedBlock: StickerBlock = {
                ...providedBlock,
                x: providedBlock.x + e.delta.x,
                y: providedBlock.y + e.delta.y,
            }
            console.log(updatedBlock)
            const updatedBlocks = blocks.map((_, i) => {
                if (i === index && _.type === providedBlock.type) return updatedBlock
                return _
            })
            dispatch(setBlocks(updatedBlocks))
            // console.log(index, e.active, updatedBlock)
        }
    }
    return (
        <DndContext onDragEnd={onDragEnd}
        >{children}</DndContext>
    )
}

export default LocalDndContext