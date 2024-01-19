'use client'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { useState } from 'react'
import { BiLoaderAlt, BiX } from 'react-icons/bi'
import Tagger from './ui/tagger'
import { useAuthState } from 'react-firebase-hooks/auth'
import { DateTime } from 'luxon'
import { useRouter } from 'next/navigation'
import { setDraft, setDraftId } from '@/components/entities/uploader/draft'
import { setFinalTouchModal } from '@/components/entities/uploader/modal.store'
import { auth } from '@/utils/app'
import { ShotData } from '@/types/shot'
import { bum } from '@/api/bum'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const FinalTouch = () => {
    const [user] = useAuthState(auth)
    const [open, setOpen] = useState<boolean>(false)
    const draftObj = useAppSelector(state => state.uploader.draft)
    const draftId = draftObj.draftId
    const draft = draftObj.draft
    const [tags, setTags] = useState<string[]>([])
    const [feedBack, setFeedBack] = useState<boolean>(false)
    const disabled = tags.length === 0
    const openDisabled = !draft.thumbnail.id || !draft.rootBlock.id || draft.title.length === 0 || !draftId
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const uploadDraft = async() => {
        if (user && draftId) {
            setLoading(true)
            const preparedBlocks = draft.blocks.filter((block => {
                if (block.type === 'media') {
                    if (!block.id) return false
                    return true
                }
                if (block.type === 'text') {
                    if (block.text === '') return false
                    return true
                }
                if (block.type === 'shotGrid') {
                    if (block.ids.length === 0) return false
                    return true
                }
                return true
            }))
            const shot: ShotData = {
                ...draft,
                blocks: preparedBlocks,
                authorId: user.uid,
                isDraft: false,
                needFeedback: feedBack,
                comments: [],
                createdAt: DateTime.now().toSeconds(),
                likes: [],
                tags: tags,
                views: [],
            }
            const isCreated = await bum.shot.create(draftId, shot)
            setLoading(false)
            if (isCreated) {
                setTags([])
                setFeedBack(true)
                dispatch(setFinalTouchModal(false))
                setOpen(false)
                dispatch(setDraftId(null))
                dispatch(setDraft({
                    isDraft: false, updatedAt: DateTime.now().toSeconds(),
                    blocks: [],
                    rootBlock: { id: '', content_type: '', type: 'media' },
                    thumbnail: { id: '', contentType: '', url: '' },
                    title: '', attachments:[], authorId: ''
                }))
                router.push(`/view/${draftId}`)
            }
        }
    }
    return (
        <Dialog onOpenChange={state => setOpen(state)} open={open}>
            <DialogTrigger asChild>
                <Button disabled={openDisabled}>Опубликовать</Button>
            </DialogTrigger>
            <DialogContent className='p-4'>
                <div onClick={e => e.stopPropagation()} className="flex flex-col w-full max-w-lg gap-2 p-4 h-fit">
                    <span className='text-lg font-medium text-neutral-300'>{draftObj.draft.title}</span>
                    <div className="flex flex-col w-full gap-2 py-4 h-80">
                        <Tagger maxCount={20} onChange={state => setTags(state)} />
                        <div onClick={() => setFeedBack(!feedBack)} className="flex items-center justify-start gap-2 cursor-pointer w-fit h-fit">
                            <Switch checked={feedBack} />
                            <span className='text-sm text-neutral-300'>Нужны комментарии?</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full h-fit shrink-0">
                        <Button onClick={uploadDraft} disabled={disabled || loading}>
                            { loading && <BiLoaderAlt size={19} className='mr-1 mb-0.5 animate-spin' /> }
                            Опубликовать
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FinalTouch