'use client'
import { bum } from "@/api/bum"
import { Button } from "@/components/ui/button"
import { DocShotData } from "@/types/shot"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiEdit, BiLoaderAlt, BiTrashAlt } from "react-icons/bi"


type Props = {
  shot: DocShotData
}
const AuthorControls = ({ shot }: Props) => {
    const { push } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const goToEditor = async() => {
      setLoading(true)
      push(`/uploads/shot/${shot.doc_id}`)
      setLoading(false)
    }
    const removeShot = async() => {
      setLoading(true)
      await bum.shot.delete(shot.doc_id)
      push('/shots/popular')
      setLoading(false)
    }
    return (
      <div className="max-w-7xl w-full mx-auto view-wrapper-paddings">
          <div className=" w-full p-4 rounded-b-lg border-x border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <Button disabled={loading} className='gap-2' onClick={goToEditor}>
                      { loading ? <BiLoaderAlt className='animate-spin' /> : <BiEdit /> }
                      Редактировать
                  </Button>
              </div>
              <div className="flex items-center gap-2">
                  <Button disabled={loading} size='icon' onClick={removeShot} variant='destructive'>
                    {
                      loading
                      ? <BiLoaderAlt className='animate-spin' />
                      : <BiTrashAlt />
                    }
                  </Button>
              </div>
          </div>
      </div>
    )
}

export default AuthorControls