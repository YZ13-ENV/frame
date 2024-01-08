'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setThumbnail } from '@/components/entities/uploader/draft'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiTrash } from 'react-icons/bi'
import Image from 'next/image'
import DropZone from '../../tools/drop-zone'
import { auth } from '@/utils/app'
import { fileChecker } from '@/helpers/filer'
import { toast } from '@/components/ui/use-toast'
import { file as fileAPI } from '@/api/file'
import { Button } from '@/components/ui/button'
import { cdn } from '@/helpers/cdn'

const ThumbnailUploader = () => {
    const [user] = useAuthState(auth)
    const [localThumbnail, setLocalThumbnail] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [localMediaType, setLocalMediaType] = useState<'video' | 'image'>('image')
    const dispatch = useAppDispatch()
    const draft = useAppSelector(state => state.uploader.draft.draft)
    const draftId = useAppSelector(state => state.uploader.draft.draftId)
    const disabled = draft.rootBlock.link === ''
    const thumbnail = useAppSelector(state => state.uploader.thumbnail)
    const onFile = async(file: File) => {
        if (user && draftId) {
            const checkedFile = fileChecker(file)
            if (localThumbnail) {
                URL.revokeObjectURL(localThumbnail)
            }
            if (checkedFile) {
                const type = checkedFile.type === '.mp4' ? 'video' : 'image'
                setLoading(true)
                setLocalMediaType(type)
                toast({
                    title: `Добавлен новый файл в ${draftId}`,
                    description: 'Подождите немного мы пока мы его сохраним'
                })
                const url = URL.createObjectURL(file)
                setLocalThumbnail(url)
                const link = `/${user.uid}/${draftId}`
                const res = await fileAPI.upload.thumbnail(link, file)
                if (res) {
                    setLoading(false)
                    dispatch(setThumbnail({
                        link: res,
                        height: '300',
                        width: '400'
                    }))
                    toast({
                        title: 'Обложка успешно добавлена'
                    })
                } else setLoading(false)
            }
        }
    }
    const uploadSavedFile = async(file: File) => {
        if (user && (draftId && draftId !== '')) {
            const url = URL.createObjectURL(file)
            const checkedFile = fileChecker(file)
            const type = checkedFile.type === '.mp4' ? 'video' : 'image'
            setLocalMediaType(type)
            setLocalThumbnail(url)
            setLoading(true)
            const link = `/${user.uid}/${draftId}`
            const res = await fileAPI.upload.thumbnail(link, file)
            if (res) {
                setLoading(false)
                toast({ title: 'Обложка была добавлена' })
                dispatch(setThumbnail({
                    link: res,
                    height: '300',
                    width: '400'
                }))
            } setLoading(false)
        }
    }
    const removeThumbnail = async() => {
        if (localThumbnail) {
            URL.revokeObjectURL(localThumbnail)
            setLocalThumbnail(null)
        }
        if (draft.thumbnail && draft.thumbnail.link !== '') {
            
            const res = await fileAPI.upload.delete(draft.thumbnail.link)
            if (res) {
                dispatch(setThumbnail(null))
                setLocalThumbnail(null)
                toast({ title: 'Обложка была удалена' })
            }
        }
    }
    return (
        <div className="relative w-full aspect-[4/3] rounded-xl bg-black border overflow-hidden border-transparent">
            { thumbnail.forcedType }
            { 
                (localThumbnail || draft.thumbnail) && <Button onClick={removeThumbnail} variant='outline' size='icon' className='absolute z-20 rounded-full top-4 right-4'>
                    <BiTrash size={16} />
                </Button> 
            }
            {
                (localThumbnail || draft.thumbnail)
                ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {
                        (localMediaType ? localMediaType === 'image' : draft.thumbnail && !draft.thumbnail.link.endsWith('.mp4'))
                        ? <Image src={localThumbnail || draft.thumbnail && cdn(draft.thumbnail.link) || ''} 
                        className={`transition-all ${loading ? 'brightness-50' :'brightness-100'}`} fill alt='previewImage' />
                        : <video className={`transition-all w-full h-full ${loading ? 'brightness-50' :'brightness-100'}`}>
                            <source src={localThumbnail || draft.thumbnail && cdn(draft.thumbnail.link) || ''} />
                        </video>
                    }
                </motion.div>
                : disabled
                ? <div className="flex flex-col items-center justify-center w-full h-full gap-6 p-4">
                    <span className='text-sm text-center'>Сначала нужно загрузить медиа в главный блок</span>
                    <div className="flex items-start w-full gap-2 px-4 h-fit">
                        <ul className="flex flex-col w-1/2 h-full gap-2">
                            <li className='text-xs list-disc text-muted-foreground'>.png, .jpg</li>
                            <li className='text-xs list-disc text-muted-foreground'>Должно отображать содержание работы</li>
                        </ul>
                        <ul className="flex flex-col w-1/2 h-full gap-2">
                            <li className='text-xs list-disc text-muted-foreground'>Просим загружать, только то что вам принадлежит</li>
                        </ul>
                    </div>
                </div>
                : !draft.thumbnail &&
                <div className="relative flex flex-col items-center justify-center w-full h-full gap-4 p-4">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <DropZone onFile={file => onFile(file)} />
                    </div>
                    <span className='text-sm text-center text-neutral-300'>Выберите или перетащите файл сюда для загрузки обложки</span>
                    { 
                        (thumbnail.savedFile && thumbnail.forcedType === 'image') && <>
                            <span className='text-sm text-center text-neutral-300'>Или вы можете</span>
                            <Button onClick={() => thumbnail.savedFile && uploadSavedFile(thumbnail.savedFile)} className='z-20' size='sm'>Загрузить из главного блока</Button> 
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default ThumbnailUploader