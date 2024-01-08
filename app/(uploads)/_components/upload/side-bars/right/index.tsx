'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import React from 'react'
import ThumbnailUploader from './thumbnail-uploader'
import { setBlocks } from '@/components/entities/uploader/draft'
import { useAuthState } from 'react-firebase-hooks/auth'
import { setStickerPicker } from '@/components/entities/uploader/modal.store'
import { Blocks, GalleryBlock, ImageBlock, TextBlock, VideoBlock, SeparatorProps } from '@/types/shot'
import { auth } from '@/utils/app'

const RightSidebar = () => {
    const [user] = useAuthState(auth)
    const draft = useAppSelector(state => state.uploader.draft.draft)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const dispatch = useAppDispatch()
    const notStarted = (draft.rootBlock.type === 'image' || draft.rootBlock.type === 'video') && draft.rootBlock.link === ''
    const addBlock = (block: Blocks['type']='image') => {
        switch (block) {
            case 'image':
                const imgBlock: ImageBlock = {
                    link: '',
                    type: 'image',
                }
                dispatch(setBlocks([...draft.blocks, imgBlock]))
                break;
        
            case 'video':
                const videoBlock: VideoBlock = {
                    link: '',
                    type: 'video',
                }
                dispatch(setBlocks([...draft.blocks, videoBlock]))
                break;
            case 'shotGrid':
                const gridBlock: GalleryBlock = {
                    ids: [],
                    title: '',
                    type: 'shotGrid'
                }
                dispatch(setBlocks([...draft.blocks, gridBlock]))
                break;
            case 'text':
                const textBlock: TextBlock = {
                    text: '',
                    type: 'text'
                }
                dispatch(setBlocks([...draft.blocks, textBlock]))
                break;
            case 'separator':
                const separator: SeparatorProps = {
                    type: 'separator',
                    withIcon: false
                }
                dispatch(setBlocks([...draft.blocks, separator]))
                break;
            case 'sticker':
                dispatch(setStickerPicker(true))
                break;
            default:
                const defaultBlock: ImageBlock = {
                    link: '',
                    type: 'image',
                }
                dispatch(setBlocks([...draft.blocks, defaultBlock]))
                break;
        }
    }
    return (
        <>
            <span className='font-medium'>Обложка работы</span>
            <ThumbnailUploader />
            {
                !notStarted &&
                <>
                    <span className='font-medium'>Блоки</span>
                    <div className="grid w-full grid-cols-3 grid-rows-2 gap-4 h-fit">
                        <div onClick={() => addBlock('text')}
                        className="flex flex-col items-center justify-center w-full h-full gap-2 bg-black cursor-pointer aspect-square rounded-xl">
                            <span className='text-sm'>Текст</span>
                        </div>
                        <div onClick={() => addBlock('image')}
                        className="flex flex-col items-center justify-center w-full h-full gap-2 bg-black cursor-pointer aspect-square rounded-xl">
                            <span className='text-sm'>Медиа</span>
                        </div>
                        {
                            isSub &&
                            <>
                                {/* <div onClick={() => addBlock('shotGrid')}
                                className="flex flex-col items-center justify-center w-full h-full gap-2 bg-black cursor-pointer aspect-square rounded-xl">
                                    <span className='text-sm'>Галерея</span>
                                </div> */}
                                <div onClick={() => addBlock('sticker')}
                                className="flex flex-col items-center justify-center w-full h-full gap-2 bg-black cursor-pointer aspect-square rounded-xl">
                                    <span className='text-sm'>Стикер</span>
                                </div>
                                <div onClick={() => addBlock('separator')}
                                className="flex flex-col items-center justify-center w-full h-full gap-2 bg-black cursor-pointer aspect-square rounded-xl">
                                    <span className='text-sm'>Разделитель</span>
                                </div>
                            </>
                        }

                    </div>
                </>
            }
        </>
    )
}

export default RightSidebar