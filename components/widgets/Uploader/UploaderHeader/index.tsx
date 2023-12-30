'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setFinalTouchModal } from '@/components/entities/uploader/modal.store'
import { BiFileBlank, BiRightArrowAlt } from 'react-icons/bi'
import { useMediaQuery } from 'react-responsive'
// import bum from 'ui/assets/bum.svg'
import Image from 'next/image'
import Link from 'next/link'
import { UserSection } from '@darkmaterial/ui/entities'
import { Button } from '@darkmaterial/ui/shadcn'
// import React from 'react'

const UploaderHeader = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const draft = useAppSelector(state => state.uploader.draft.draft)
    const draftId = useAppSelector(state => state.uploader.draft.draftId)
    const dispatch = useAppDispatch()
    const disabled = draft.title === '' || draft.rootBlock.link === '' || (!draft.thumbnail || draft.thumbnail.link === '')
    return (
        <div className="flex items-center justify-between w-full gap-2 p-2 h-14">
            <div className="flex flex-row items-center gap-4 px-2 shrink-0 w-fit h-fit">
                <Link href='/'><Image src={'bum'} width={32} className='shrink-0' height={32} alt='bum-logo' /></Link>
                <div className="flex items-center gap-2 px-3 py-2 mx-auto border rounded-lg w-fit h-fit bg-neutral-900 border-neutral-700">
                    <BiFileBlank size={19} className='mb-0.5' />
                    <span className='text-sm text-neutral-300'>Черновики</span>
                    <span className='text-sm text-neutral-300'>/</span>
                    <span className='text-sm text-neutral-300'>{draftId || 'Пустой черновик'}</span>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2 px-2 w-fit shrink-0 h-fit">
                <UserSection />
                <Button disabled={disabled} size='default'
                onClick={() => dispatch(setFinalTouchModal(true))} variant='default'>{isTabletOrMobile ? <BiRightArrowAlt size={17} /> :'Продолжить'}</Button>
            </div>
        </div>
    )
}

export default UploaderHeader