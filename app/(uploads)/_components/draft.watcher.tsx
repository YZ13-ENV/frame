'use client'

import { bum } from "@/api/bum"
import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setDraft } from "@/components/entities/uploader/draft"
import { DocDraftShotData } from "@/types/shot"
import { useDebounceEffect } from "ahooks"
import { isEqual } from "lodash"
import { DateTime } from "luxon"
import { useEffect, useMemo, useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import { MdOutlineCloudDone, MdOutlineCloudQueue } from "react-icons/md"

type Props = {
  draft: DocDraftShotData
}
const DraftWatcher = ({ draft }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const localDraft = useAppSelector(state => state.uploader.draft.draft)
    const [debouncedDraft, setDebouncedDraft] = useState<DocDraftShotData>(draft)
    const draftId = useAppSelector(state => state.uploader.draft.draftId)
    const isEq = useMemo(() => { return isEqual(debouncedDraft, localDraft) },[localDraft, debouncedDraft])
    const dispatch = useAppDispatch()
    const lastUpdate = useMemo(() => { return DateTime.fromSeconds(localDraft.updatedAt).setLocale('ru') }, [localDraft, debouncedDraft])
    const syncDraft = async() => {
      setLoading(true)
      const updatedDraft = await bum.draft.update(draft.doc_id, localDraft)
      if (updatedDraft) {
        setDebouncedDraft(updatedDraft)
        dispatch(setDraft(updatedDraft))
        setLoading(false)
      } setLoading(false)
    }
    useDebounceEffect(() => {
      if (!isEq) syncDraft()
    },[isEq, localDraft, debouncedDraft], { wait: 2000 })
    useEffect(() => {
      dispatch(setDraft(draft))
    },[])
    return (
        <div className="w-fit h-fit flex items-center gap-2">
            <span className="text-sm text-muted-foreground inline-flex items-center gap-1 ">
                Последнее обновление - <span className="capitalize">{lastUpdate.toFormat('HH:mm dd MMMM yyyy')}</span>
            </span>
            {
              loading
              ? <BiLoaderAlt size={18} className='animate-spin' />
              : isEq ? <MdOutlineCloudDone size={18} />
              : <MdOutlineCloudQueue size={18} />
            }
        </div>
    )
}

export default DraftWatcher