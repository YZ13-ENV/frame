'use client'
import React from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft'
import { keys } from 'lodash'
import { setStickerPicker } from '@/components/entities/uploader/modal.store'
import { stickers } from '@/const/stickers'
import { StickerBlock } from '@/types/shot'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const StickerPicker = () => {
    const dispatch = useAppDispatch()
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const keysFromStickers = keys(stickers)
    const addSticker = (key: string) => {
        const sticker: StickerBlock = {
            code: key,
            rotate: 0,
            type: 'sticker',
            x: 10,
            y: 10
        }
        dispatch(setBlocks([...blocks, sticker]))
    }
    const modal = useAppSelector(state => state.uploader.modal.stickerPicker)
    if (!modal) return null
    return (
        <Dialog onOpenChange={state => dispatch(setStickerPicker(state))}>
            <DialogContent asChild>
                <div className='flex flex-col w-full max-w-lg gap-4 p-4 rounded-b-lg h-fit rounded-t-2xl bg-neutral-900'>
                    <span className='text-lg font-medium'>Выберите стикер для добавления</span>
                    <div className="flex flex-wrap items-start w-full gap-2">
                        {
                            keysFromStickers.map(key =>
                                <div key={key} onClick={() => addSticker(key)}
                                className="flex items-center justify-center w-12 h-12 rounded-lg hover:bg-neutral-800">
                                    <Image src={stickers[key]} alt='sticker' width={36} height={36} /> 
                                </div>
                            )
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default StickerPicker