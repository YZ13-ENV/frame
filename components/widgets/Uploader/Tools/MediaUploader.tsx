'use client'
import { useState } from 'react'
import DropZone from './DropZone'
import Image from 'next/image'
import { BiTrash } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { motion } from 'framer-motion'
import { setBlocks, setDraftId, setRootBlock } from '@/components/entities/uploader/draft'
import { setForcedType, setSavedFile } from '@/components/entities/uploader/thumbnail.store'
import type { ImageBlock, VideoBlock } from '@darkmaterial/core/types'
import { auth } from '@darkmaterial/core/utils'
import { cdn, filer, format } from '@darkmaterial/api/helpers'
import { Button, toast } from '@darkmaterial/ui/shadcn'
import { fileAPI } from '@darkmaterial/api'
import { Ambient } from '@darkmaterial/ui/shared'

type Props = {
    rootBlock: boolean
    block?: VideoBlock | ImageBlock
    index?: number
}
const MediaUploader = ({ rootBlock, block, index }: Props) => {
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const [localThumbnail, setLocalThumbnail] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [localMediaType, setLocalMediaType] = useState<'video' | 'image'>('image')
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const draft = useAppSelector(state => state.uploader.draft.draft)
    const draftId = useAppSelector(state => state.uploader.draft.draftId)
    const onFile = async(file: File) => {
        const localDraftId = draftId ? draftId : format.random(30)
        if (user && localDraftId) {
            const checkedFile = filer.check(user.uid, localDraftId, file)
            if (checkedFile) {
                if (localThumbnail) {
                    URL.revokeObjectURL(localThumbnail)
                }
                setLoading(true)
                dispatch(setDraftId(localDraftId))
                setLocalMediaType(checkedFile.type)
                dispatch(setForcedType(checkedFile.type))
                toast({
                    title: `Добавлен новый файл в ${localDraftId}`,
                    description: 'Подождите немного мы пока мы его сохраним'
                })
                const url = URL.createObjectURL(file)
                setLocalThumbnail(url)
                const res = await uploadFile(file)
                if (res) {
                    if (rootBlock) {
                        dispatch(setSavedFile(file))
                        dispatch(setRootBlock({ type: checkedFile.type, link: res }))
                        setLoading(false)
                    } else {
                        const block = { type: checkedFile.type, link: res } as VideoBlock | ImageBlock
                        const updatedBlocks = draft.blocks.map((_, i) => {
                            if (index === i) return block
                            return _
                        })
                        dispatch(setBlocks(updatedBlocks))
                        setLoading(false)
                    }
                } else setLoading(false)
            }
        }
    }
    const uploadFile = async(file: File) => {
        if (user && draftId !== '') {
            const res = await fileAPI.upload.file(user.uid, draftId, file)
            return res
        } return null
    }
    const removeThumbnail = async() => {
        if (localThumbnail) {
            URL.revokeObjectURL(localThumbnail)
            setLocalThumbnail(null)
        }
        if (rootBlock) {
            if (draft.rootBlock.type === 'image' || draft.rootBlock.type === 'video') {
                
                const res = await fileAPI.delete(draft.rootBlock.link)
                if (res) {
                    dispatch(setRootBlock({ type: 'image', link: '' }))
                    dispatch(setSavedFile(null))
                    setLocalThumbnail(null)
                    toast({ title: 'Файл был удален' })
                }
            }
        } else {
            const blockIndex = draft.blocks.findIndex((_, i) => i === index)
            if (blockIndex > -1) {
                const block = draft.blocks[blockIndex] as VideoBlock | ImageBlock
                const res = await fileAPI.delete(block.link)
                if (res) {
                    const block = { type: 'image', link: '' } as VideoBlock | ImageBlock
                    const updatedBlocks = draft.blocks.map((_, i) => {
                        if (index === i) return block
                        return _
                    })
                    setLocalThumbnail(null)
                    dispatch(setBlocks(updatedBlocks))
                    toast({ title: 'Файл был удален' })
                }
            }
        }
    }
    const stableLink = (!rootBlock ? block.link : (draft.rootBlock.type === 'video' || draft.rootBlock.type === 'image') && draft.rootBlock.link)
    return (
        <div className="relative w-full aspect-[4/3] rounded-xl flex items-center justify-center overflow-hidden border border-neutral-700">
            { 
                (localThumbnail || (block && block.link) || (rootBlock && draft.rootBlock.link)) && 
                <Button onClick={removeThumbnail} variant='outline' size='icon' className='absolute z-40 rounded-full top-4 right-4'>
                    <BiTrash size={16} />
                </Button> 
            }
            {
                localThumbnail
                ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`w-full h-full transition-all ${loading ? 'brightness-50' :'brightness-100'}`}>
                    {
                        isSub
                        ? <Ambient link={localThumbnail} forcedIsVideo={localMediaType === 'video' ? true : false} />
                        : localMediaType === 'image'
                        ? <Image src={localThumbnail} fill className='w-full h-full' alt='previewImage' />
                        : <video autoPlay loop muted className='w-full h-full'>
                            <source src={localThumbnail} />
                        </video>
                    }
                </motion.div>
                : ((block && block.link) || (rootBlock && draft.rootBlock.link))
                ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`w-full h-full transition-all ${loading ? 'brightness-50' :'brightness-100'}`}>
                    {
                        isSub
                        ? <Ambient link={cdn(stableLink)} />
                        : draft.rootBlock.type === 'image'
                        ? <Image src={stableLink} fill className='w-full h-full' alt='previewImage' />
                        : <video autoPlay loop muted className='w-full h-full'>
                            <source src={stableLink} />
                        </video>
                    }
                </motion.div>
                :
                <>
                    <div className="absolute flex flex-col items-center justify-center max-w-md w-fit h-fit">
                        <span className='text-center text-neutral-300'>Перенести нужный файл в эту область, или нажмите и выберите из списка</span>
                    </div>
                    <DropZone onFile={file => onFile(file)} />
                </>
            }
        </div>
    )
}

export default MediaUploader