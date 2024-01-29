'use client'

import { bum } from "@/api/bum"
import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setDraft, setDraftId, setTeamId } from "@/components/entities/uploader/draft"
import { DocDraftShotData } from "@/types/shot"
import { useDebounceEffect } from "ahooks"
import { DraftShotData, team } from "api"
import { isEqual } from "lodash"
import { DateTime } from "luxon"
import { useEffect, useMemo, useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import { MdOutlineCloudDone, MdOutlineCloudQueue } from "react-icons/md"

type Props = {
  draft: DocDraftShotData
  teamId?: string
}
const DraftWatcher = ({ draft, teamId }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const localDraft = useAppSelector(state => state.uploader.draft.draft)
    const [debouncedDraft, setDebouncedDraft] = useState<DraftShotData>(draft)
    const isEq = useMemo(() => { return isEqual(debouncedDraft, localDraft) },[localDraft, debouncedDraft])
    const dispatch = useAppDispatch()
    const lastUpdate = useMemo(() => { return DateTime.fromSeconds(localDraft.updatedAt).setLocale('ru') }, [localDraft, debouncedDraft])
    const syncDraft = async() => {
      setLoading(true)
      const updatedDraft = teamId
      ? await team.draft.update(teamId, draft.doc_id, localDraft)
      : await bum.draft.update(draft.doc_id, localDraft)
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
      dispatch(setDraftId(draft.doc_id))
      dispatch(setTeamId(teamId || null))
    },[])
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground ">
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