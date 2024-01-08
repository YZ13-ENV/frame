'use client'
// import React from 'react'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setTitle } from '@/components/entities/uploader/draft'

const TitleInput = () => {
    const draft = useAppSelector(state => state.uploader.draft.draft)
    const dispatch = useAppDispatch()
    const disabled = (draft.rootBlock.type === 'image' || draft.rootBlock.type === 'video') ? draft.rootBlock.link === '' : true
    return (
        <div className='flex items-center justify-center w-full h-10 mx-auto'>
            <Input placeholder='Как назовёте проект?' disabled={disabled} value={draft.title} onChange={e => dispatch(setTitle(e.target.value))}
            className='text-4xl font-medium text-center !border-0 !ring-0 bg-transparent rounded-none w-full !outline-none' />
        </div>
    )
}

export default TitleInput