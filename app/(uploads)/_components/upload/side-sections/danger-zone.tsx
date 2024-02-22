'use client'
import { bum } from "api"
import { useAppSelector } from "@/components/entities/store/store"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"

const DangerZone = () => {
  const draftId = useAppSelector(state => state.uploader.draft.draftId)
  const [loading, setLoading] = useState<boolean>(false)
  const { push } = useRouter()
  const deleteDraft = async () => {
    if (draftId) {
      setLoading(true)
      await bum.draft.delete(draftId)
      push('/uploads/shot')
      setLoading(false)
    }
  }
  return (
    <div>
      <Button onClick={deleteDraft} variant='destructive' className="gap-2 w-full">
        {loading && <BiLoaderAlt className='animate-spin' />}
        Удалить черновик
      </Button>
    </div>
  )
}

export default DangerZone