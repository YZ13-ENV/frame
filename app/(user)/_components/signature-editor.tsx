'use client'
import { bum } from "@/api/bum"
import Textarea from "@/components/shared/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { BiLoaderAlt, BiSave } from "react-icons/bi"

type Props = {
  readOnly?: boolean
  signature: string
  id: string
}
const SignatureEditor = ({ readOnly, signature, id }: Props) => {
  const [text, setText] = useState<string>(signature)
  const [debounced, setDebounced] = useState<string>(signature)
  const [loading, setLoading] = useState<boolean>(false)
  const updateSignature = async() => {
    setLoading(true)
    const newSignature = await bum.author.addSignature(id, text)
    setDebounced(newSignature)
    setLoading(false)
  }
  if (readOnly) return <span className="author-description my-4">{text || signature}</span>
  return (
    <div className="max-w-full flex gap-2 items-center justify-center flex-col my-4">
      <Textarea className="w-full author-description" placeholder="Ведите здесь..." value={text} onChange={e => setText(e.target.value)} />
      {
        debounced !== text &&
        <Button onClick={updateSignature} variant='outline' size='icon'>
          {
            loading
            ? <BiLoaderAlt className='animate-spin' />
            : <BiSave />
          }
        </Button>
      }
    </div>
  )
}

export default SignatureEditor