'use client'
import { useAppSelector } from '@/components/entities/store/store'
import { useState } from 'react'
import { useDebounceEffect } from 'ahooks'
import { ShotForUpload } from '@darkmaterial/core/types'
import { isEqual } from 'lodash'
import { toast } from '@darkmaterial/ui/shadcn'
import { bumAPI } from '@darkmaterial/api'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@darkmaterial/core/utils'

const DraftWatcher = () => {
    const [user] = useAuthState(auth)
    const draftObj = useAppSelector(state => state.uploader.draft)
    const [debouncedDraft, setDebouncedDraft] = useState<ShotForUpload | null>(null)
    const getSyncDraft = async() => {
        if (user && draftObj.draftId !== '') {
            bumAPI.draft.update(user.uid, draftObj.draftId, draftObj.draft)
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