'use client'
import Textarea from "@/components/shared/textarea"
import { auth } from "@/utils/app"
import { Dispatch, SetStateAction } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

type Props = {
  text: string
  setText: Dispatch<SetStateAction<string>>
}
const NewCommentForm = ({ setText, text }: Props) => {
  const [user] = useAuthState(auth)
  return (
    <Textarea className="w-full border rounded-xl min-h-[6rem] p-3 text-sm"
    disabled={!user} value={text} onChange={e => setText(e.target.value)}
    placeholder="Введите здесь..." />
  )
}

export default NewCommentForm