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
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const FinalTouch = () => {
    const [user] = useAuthState(auth)
    const finalTouchModal = useAppSelector(state => state.uploader.modal.finalTouchModal)
    const draftObj = useAppSelector(state => state.uploader.draft)
    const draftId = draftObj.draftId
    const draft = draftObj.draft
    const [tags, setTags] = useState<string[]>([])
    const [feedBack, setFeedBack] = useState<boolean>(false)
    const disabled = tags.length === 0
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const uploadDraft = async() => {
        if (user && draftId) {
            setLoading(true)
            const preparedBlocks = draft.blocks.filter((block => {
                if (block.type === 'media') {
                    if (block.id === 0) return false
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
                updatedAt: DateTime.now().toSeconds()
            }
            await bum.shot.create(draftId, shot)
            setLoading(false)
            setTags([])
            setFeedBack(true)
            dispatch(setFinalTouchModal(false))
            dispatch(setDraftId(null))
            dispatch(setDraft({ blocks: [], rootBlock: { id: 0, content_type: '', type: 'media' }, thumbnail: { id: 0, contentType: '', url: '' }, title: '', attachments:[], authorId: '' }))
            router.push(`/view?s=${draftId}`)
        }
    }
    if (!finalTouchModal) return null
    return (
        <Dialog onOpenChange={state => dispatch(setFinalTouchModal(state))}>
            <DialogContent asChild>
                <div onClick={e => e.stopPropagation()} className="flex flex-col w-full max-w-lg gap-2 p-4 h-fit rounded-xl bg-neutral-900">
                    <div className="flex items-center justify-between w-full h-fit">
                        <span className='text-lg font-medium text-neutral-300'>{draftObj.draft.title}</span>
                        <Button variant='ghost'><BiX size={20} /></Button>
                    </div>
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