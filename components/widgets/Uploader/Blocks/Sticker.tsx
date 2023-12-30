import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { MdOutlineRotate90DegreesCw } from 'react-icons/md'
import { RxSize } from 'react-icons/rx'
import { StickerBlock } from '@darkmaterial/core/types'
import { stickers } from '@darkmaterial/core/const'
import { Input } from '@darkmaterial/ui/shadcn'

type Props = {
    block: StickerBlock
    index: number
}
const Sticker = ({ block, index }: Props) => {
    const sticker = stickers[block.code]
    const { setNodeRef, transform, listeners, attributes, isDragging } = useDraggable({
        id: index + 1,
        data: {
            block: block
        }
    });
    const style = {
        transform: transform 
        ? CSS.Transform.toString({ x: block.x + transform.x, y: block.y + transform.y, scaleX: isDragging ? .85 : 1, scaleY: isDragging ? .85 : 1 }) 
        : CSS.Transform.toString({ x: block.x, y: block.y, scaleX: 1, scaleY: 1 }),
        transition: isDragging ? 'transform linear 0ms' : 'transform cubic-bezier(0.4, 0, 0.2, 1) 300ms'
    };
    return (
        <div ref={setNodeRef} className='absolute z-20 w-fit h-fit' style={style} {...listeners} {...attributes}>
            <Image src={sticker} width={block.width ? `${block.width}` : 24} style={{ rotate: `${block.rotate}deg`} }
            height={block.height ? `${block.height}` : 24} alt='sticker' />
        </div>
    )
}

export default Sticker

export const StickerMenuBlock = ({ block, index }: Props) => {
    const [size, setSize] = useState<string>(block.width ? String(block.width) : '24')
    const [rotate, setRotate] = useState<string>(String(block.rotate) || '0')
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const dispatch = useAppDispatch()
    const deleteBlock = () => {
        const filteredBlocks = blocks.filter((_, i) => index !== i)
        dispatch(setBlocks(filteredBlocks))
    }
    const updateWidthHeight = () => {
        const sizeInNumber = parseInt(size)
        const stableNumber = sizeInNumber < 0 ? sizeInNumber * -1 : sizeInNumber
        const rotateInNumber = parseInt(rotate)
        const updatedBlock: StickerBlock = {
            ...block,
            rotate: rotateInNumber,
            width: stableNumber,
            height: stableNumber
        }
        const updatedBlocks = blocks.map((_, i) => {
            if (i === index && _.type === block.type) return updatedBlock
            return _
        })
        dispatch(setBlocks(updatedBlocks))
    }
    useEffect(() => {
        if (size !== '') updateWidthHeight()
    },[size, rotate])
    return (
        <div className="flex items-center justify-between w-full gap-2 p-2 pl-3 border h-14 rounded-xl border-neutral-800 hover:bg-neutral-900">
            <div className="flex items-center gap-2 w-fit h-fit group">
                <div onClick={deleteBlock} className='items-center justify-center hidden w-6 h-6 cursor-pointer group-hover:flex'>
                    <BiX size={32} />
                </div>
                <div className='flex items-center justify-center w-6 h-6 group-hover:hidden'>
                    <Image src={stickers[block.code]} width={32} height={32} alt='sticker' />
                </div>
                <span className='text-sm text-neutral-300'>Стикер</span>
            </div>
            <div className="flex items-center gap-2 w-fit h-fit">
                <div className="flex items-center gap-2 w-fit h-fit">
                    <MdOutlineRotate90DegreesCw size={16} />
                    <Input value={rotate} onChange={e => setRotate(e.target.value)} className='w-16 text-center' maxLength={3} placeholder='0' />
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                    <RxSize size={16} />
                    <Input value={size} onChange={e => setSize(e.target.value)} className='w-12 text-center' maxLength={3} placeholder='24' />
                </div>
            </div>
        </div>
    )
}