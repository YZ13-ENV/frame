import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft'
import type { TextBlock } from '@darkmaterial/core/types'
import React from 'react'
import { BiText, BiX } from 'react-icons/bi'
import { BsMarkdown } from 'react-icons/bs'

type Props = {
    block: TextBlock
    index: number
}
const TextBlock = ({ block, index }: Props) => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const dispatch = useAppDispatch()
    const deleteBlock = () => {
        const filteredBlocks = blocks.filter((_, i) => i !== index)
        dispatch(setBlocks(filteredBlocks))
    }
    return (
        <div className="flex items-center justify-between w-full gap-2 px-3 py-2 border h-14 rounded-xl border-neutral-800 hover:bg-neutral-900">
            <div className="flex items-center gap-2 w-fit h-fit group">
                <div className='items-center justify-center hidden w-6 h-6 cursor-pointer shrink-0 group-hover:flex'>
                    <BiX onClick={deleteBlock} size={32} />
                </div>
                <div className='flex items-center justify-center w-6 h-6 group-hover:hidden'>
                    <BiText size={32} />
                </div>
                <span className='text-sm text-neutral-300'>Текст</span>
            </div>
            <div className="flex items-center gap-2 w-fit h-fit">
                <BsMarkdown size={24} className='text-neutral-400' />
            </div>
        </div>
    )
}

export default TextBlock