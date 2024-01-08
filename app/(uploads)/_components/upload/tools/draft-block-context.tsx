'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft'
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
    items: (UniqueIdentifier | { id: UniqueIdentifier })[]
}
const DraftBlockContext = ({ children, items }: Props) => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const dispatch = useAppDispatch()
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 10
        }
    });
    const sensors = useSensors(
      mouseSensor,
      touchSensor,
    );
    const onDragEnd = (e: DragEndEvent) => {
        if (e.active && e.over) {
            const startIndex = e.active.id as number - 1
            const endIndex = e.over.id as number - 1
            const active = e.active.data.current
            const over = e.over.data.current
            if (active && over && active.block && over.block) {
                const startItem = active.block
                const endItem = over.block
                const updatedBlocks = blocks.map((_, i) => {
                    if (i === startIndex) return endItem
                    if (i === endIndex) return startItem
                    return _
                })
                dispatch(setBlocks(updatedBlocks))
            }
        }
        // console.log(e)
    }
    return (
        <DndContext onDragEnd={onDragEnd} sensors={sensors}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    )
}

export default DraftBlockContext