'use client'
import { useAppSelector } from '@/components/entities/store/store'
import { useState } from 'react'
import { useDebounceEffect } from 'ahooks'
import { isEqual } from 'lodash'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { ShotForUpload } from '@/types/shot'
import { bum } from '@/api/bum'
import { toast } from '@/components/ui/use-toast'

const DraftWatcher = () => {
    const [user] = useAuthState(auth)
    const draftObj = useAppSelector(state => state.uploader.draft)
    const [debouncedDraft, setDebouncedDraft] = useState<ShotForUpload | null>(null)
    const getSyncDraft = async() => {
        if (user && draftObj.draftId) {
            bum.draft.update(user.uid, draftObj.draftId, draftObj.draft)
            toast({
                title: 'Черновик синхронизирован',
                description: draftObj.draft.title || 'Без названия'
            })
        }
    }
    useDebounceEffect(() => {
        if (draftObj.draftId && draftObj.draftId !== '' && !isEqual(draftObj.draft, debouncedDraft)) {
            setDebouncedDraft(draftObj.draft)
            toast({
                title: 'Синхронизация черновика',
                description: draftObj.draft.title || 'Без названия'
            })
            getSyncDraft()
        }
    },[draftObj])
    return (
        <></>
    )
}

export default DraftWatcher