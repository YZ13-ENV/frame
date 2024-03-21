"use client"

import { Button } from "@/components/ui/button"
import { DocShotData } from "@darkmaterial/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"

type Props = {
  shot: DocShotData
}
const EditButton = ({ shot }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { push } = useRouter()
  const hasTeam = !!shot.teamId
  const goToEditor = async () => {
    if (hasTeam) {
      setLoading(true)
      push(`/uploads/${shot.teamId}/${shot.doc_id}`)
      setLoading(false)
    } else {
      setLoading(true)
      push(`/uploads/shot/${shot.doc_id}`)
      setLoading(false)
    }
  }
  return (
    <Button
      disabled={loading}
      onClick={goToEditor}
      className="rounded-full gap-2"
      variant="secondary"
    >
      {loading && <BiLoaderAlt className="animate-spin" size={16} />}
      Редактировать
    </Button>
  )
}

export default EditButton