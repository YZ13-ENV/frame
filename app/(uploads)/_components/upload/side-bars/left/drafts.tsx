import { useState } from 'react'
import { BiLoaderAlt, BiTrashAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks, setDraftId, setRootBlock, setThumbnail, setTitle } from '@/components/entities/uploader/draft'
import { DocDraftShotData } from '@/types/shot'
import { api_host } from '@/const/host'
import { Button } from '@/components/ui/button'

type Props =  {
    uid: string
}
const Drafts = ({ uid }: Props) => {
    const draftId = useAppSelector(state => state.uploader.draft.draftId)
    // const q = query(collection(db, 'users', uid, 'shots'), where('isDraft', '==', true))
    // const [value, loading, error] = useCollection( q )
    const [eventLoading, setEventLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const removeDraft = async(shot: DocDraftShotData) => {
        setEventLoading(true)
        await fetch(`${api_host}/shots/shot/${shot.doc_id}/${shot.authorId}`, { method: "DELETE" })
        setEventLoading(false)
    }
    const getInDraft = (draft: DocDraftShotData) => {
        dispatch(setDraftId(draft.doc_id))
        dispatch(setRootBlock(draft.rootBlock))
        dispatch(setBlocks(draft.blocks))
        dispatch(setTitle(draft.title))
        if (draft.thumbnail) dispatch(setThumbnail(draft.thumbnail))

    }
    if (![]) return null
    return (
        <>
            {
                [].map((snap) => {
                    const shot = snap as DocDraftShotData
                    const isActiveDraft = draftId === shot.doc_id
                    return (
                        <div key={shot.doc_id} onClick={() => getInDraft(shot)}
                        className='w-full aspect-[4/3] rounded-lg border relative'>
                            {
                                isActiveDraft &&
                                <div className='absolute z-20 flex items-center justify-center w-full h-full bg-black rounded-lg bg-opacity-40 backdrop-blur'>
                                    <span className='text-sm text-neutral-300'>Активный черновик</span>
                                </div> 
                            }
                            { 
                                eventLoading && <div className='absolute z-20 flex items-center justify-center w-full h-full bg-black rounded-lg bg-opacity-40 backdrop-blur'>
                                    <BiLoaderAlt size={21} className='animate-spin text-neutral-300' />
                                </div> 
                            }
                            <div onClick={e => e.stopPropagation()} className='absolute flex items-center gap-2 w-fit h-fit top-3 right-3'>
                                <Button onClick={() => removeDraft(shot)}
                                disabled={isActiveDraft || eventLoading} variant='destructive' size='icon'><BiTrashAlt/></Button>
                            </div>
                            <span className='absolute text-base font-medium bottom-3 left-3 line-clamp-1'>{shot.title || 'Без названия'}</span>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Drafts