'use client'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'

type Props = {
    onChange?: (tags: string[]) => void
    showTitle?: boolean
    maxCount?: number
}
const Tagger = ({ onChange, showTitle = true, maxCount }: Props) => {
    const [text, setText] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    const disabled = maxCount ? tags.length === maxCount : false
    const addTag = () => {
        if (text.length !== 0 && !tags.includes(text)) {
            setTags([...tags, text])
            setText('')
        } else setText('')
    }
    const deleteTag = (tag: string) => {
        const filteredTags = tags.filter(tg => tg !== tag)
        setTags(filteredTags)
    }
    useEffect(() => {
        if (onChange) onChange(tags)
    }, [tags])
    return (
        <div className='flex flex-col w-full gap-2 h-fit'>
            {showTitle && <span className='text-sm font-medium text-neutral-400'>Добавьте тэги {maxCount && `(Максимум - ${tags.length}/${maxCount})`}</span>}
            <Input placeholder='Введите тэг, нажмите Enter для добавления' className='rounded-xl' disabled={disabled}
                value={text} onChange={e => setText(e.target.value)} onKeyUp={e => e.key === 'Enter' && addTag()} />
            <div className="flex flex-wrap items-start w-full gap-1 h-fit">
                {
                    tags.map(tag =>
                        <div className='px-2 py-0.5 rounded-lg inline-flex gap-1 items-center text-sm bg-black border border-neutral-700 text-neutral-300' key={tag}>
                            <span className='text-inherit'>{tag}</span>
                            <BiX onClick={() => deleteTag(tag)}
                                className='cursor-pointer text-neutral-400 hover:text-neutral-200' size={15} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Tagger