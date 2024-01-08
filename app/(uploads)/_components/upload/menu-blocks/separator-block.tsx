import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft'
import { SeparatorProps } from '@/types/shot'
import React from 'react'
import { BiX } from 'react-icons/bi'
import { RiSeparator } from 'react-icons/ri'

type Props = {
    block: SeparatorProps
    index: number
}
const SeparatorBlock = ({ block, index }: Props) => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const dispatch = useAppDispatch()
    const deleteBlock = () => {
        const filteredBlocks = blocks.filter((_, i) => index !== i)
        dispatch(setBlocks(filteredBlocks))
    }
    return (
        <div className="flex items-center justify-between w-full gap-2 p-2 pl-3 border h-14 rounded-xl border-neutral-800 hover:bg-neutral-900">
            <div className="flex items-center gap-2 w-fit h-fit group">
                <div onClick={deleteBlock} className='items-center justify-center hidden w-6 h-6 cursor-pointer group-hover:flex'>
                    <BiX size={32} />
                </div>
                <div className='flex items-center justify-center w-6 h-6 group-hover:hidden'>
                    <RiSeparator size={32} />
                </div>
                <span className='text-sm text-neutral-300'>Разделитель</span>
            </div>
        </div>
    )
}

export default SeparatorBlock