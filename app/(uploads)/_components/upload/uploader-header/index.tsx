'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setFinalTouchModal } from '@/components/entities/uploader/modal.store'
import { BiFileBlank, BiRightArrowAlt } from 'react-icons/bi'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cdn } from '@/helpers/cdn'
import User from '@/components/shared/user-circle'

const UploaderHeader = () => {
    const draft = useAppSelector(state => state.uploader.draft.draft)
    const draftId = useAppSelector(state => state.uploader.draft.draftId)
    const dispatch = useAppDispatch()
    const disabled = draft.title === '' || draft.rootBlock.link === '' || (!draft.thumbnail || draft.thumbnail.link === '')
    return (
        <div className="flex items-center justify-between w-full gap-2 p-2 h-14">
            <div className="flex flex-row items-center gap-4 px-2 shrink-0 w-fit h-fit">
                <Link href='/'><Image src={cdn('dm/icons/frame-dark.svg')} width={32} className='shrink-0' height={32} alt='bum-logo' /></Link>
                <div className="flex items-center gap-2 px-3 py-2 mx-auto border rounded-lg w-fit h-fit bg-neutral-900 border-neutral-700">
                    <BiFileBlank size={19} className='mb-0.5' />
                    <span className='text-sm text-neutral-300'>Черновики</span>
                    <span className='text-sm text-neutral-300'>/</span>
                    <span className='text-sm text-neutral-300'>{draftId || 'Пустой черновик'}</span>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2 px-2 w-fit shrink-0 h-fit">
                <User />
                <Button disabled={disabled} size='default' className='gap-2'
                onClick={() => dispatch(setFinalTouchModal(true))} variant='default'>Продолжить <BiRightArrowAlt size={17} /></Button>
            </div>
        </div>
    )
}

export default UploaderHeader