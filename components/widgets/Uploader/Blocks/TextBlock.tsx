'use client'
import TextBlockOutput from '@/app/view/TextBlock'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft'
import { useState } from 'react'
import { BsMarkdown } from 'react-icons/bs'
import { TextBlock } from '@darkmaterial/core/types'
import { Button } from '@darkmaterial/ui/shadcn'
import { TextArea } from '@darkmaterial/ui/shared'


type Props = {
    index: number
    block: TextBlock
}
const TextBlockInput = ({ index, block }: Props) => {
    const draft = useAppSelector(state => state.uploader.draft.draft)
    const [preview, setPreview] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const updateBlock = (text: string) => {
        const updatedBlock: TextBlock = {
            ...block,
            text: text
        }
        const updatedBlocks = draft.blocks.map((_, i) => {
            if (i === index && _.type === block.type) {
                return updatedBlock
            }
            return _
        })
        dispatch(setBlocks(updatedBlocks))
    }
    if (preview) return (
        <div className="flex flex-col w-full max-w-2xl gap-4 mx-auto h-fit">
            <TextBlockOutput {...block} />
            <div className="flex items-center justify-end w-full gap-4 h-fit">
                <Button onClick={() => setPreview(!preview)} size='sm' variant={preview ? 'default' : 'outline'}>Предпросмотр</Button>
                <span className='inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-neutral-900 text-neutral-300'>
                    <BsMarkdown className='text-inherit' size={18} />
                    Работает
                </span>
            </div>
        </div>
    )
    return (
        <div className="flex flex-col w-full max-w-2xl gap-4 mx-auto h-fit">
            <TextArea value={block.text} onChange={e => updateBlock(e.target.value)} className='w-full' placeholder='Введите текст здесь' />
            <div className="flex items-center justify-end w-full gap-4 h-fit">
                <Button onClick={() => setPreview(!preview)} size='sm' variant={preview ? 'default' : 'outline'}>Предпросмотр</Button>
                <span className='inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-neutral-900 text-neutral-300'>
                    <BsMarkdown className='text-inherit' size={18} />
                    Работает
                </span>
            </div>
        </div>
    )
}

export default TextBlockInput