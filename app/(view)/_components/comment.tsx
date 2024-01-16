'use client'
import { user } from "@/api/user"
import Avatar from "@/components/shared/avatar"
import { Button } from "@/components/ui/button"
import { CommentBlock } from "@/types/shot"
import { ShortUserData } from "@/types/user"
import { auth } from "@/utils/app"
import { DateTime } from "luxon"
import { memo, useEffect, useMemo, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { BiTrashAlt } from "react-icons/bi"

type Props = {
  comment: CommentBlock
  onDelete?: (commentId: string) => void
}
const Comment = ({ comment, onDelete }: Props) => {
  const [signedUser] = useAuthState(auth)
  const [author, setAuthor] = useState<ShortUserData | null>(null)
  const isYou = useMemo(() => { return signedUser ? signedUser.uid === comment.authorId : false }, [signedUser, comment.authorId])
  const disabled = !!onDelete === false
  useEffect(() => {
    user.byId.short(comment.authorId)
    .then(author => setAuthor(author))
  },[comment])
  return (
    <div className="w-full h-fit rounded-lg p-3 flex gap-3 border hover:bg-muted">
      {
        author && author.photoUrl
        ? <Avatar src={author.photoUrl} size={36} isSubscriber={author.isSubscriber || false} />
        : <div className="w-9 h-9 rounded-full bg-muted shrink-0" />
      }
      <div className="w-full h-fit flex flex-col">
        <div className="w-full h-fit flex flex-row justify-between items-center">
          <div className="w-fit h-fit flex flex-col">
            <span className="text-base text-accent-foreground">{author?.displayName || 'Пользователь'}</span>
            <span className="text-xs text-muted-foreground">{DateTime.fromSeconds(comment.createdAt).setLocale('ru').toRelative()}</span>
          </div>
          {
            isYou
            ? <Button onClick={() => onDelete && onDelete(comment.id)} disabled={disabled}
            size='icon' variant='destructive'><BiTrashAlt /></Button>
            : <button className="hidden"/>
          }
        </div>
        <span className="text-sm mt-2 text-muted-foreground">{comment.text}</span>
      </div>
    </div>
  )
}

export default memo(Comment)