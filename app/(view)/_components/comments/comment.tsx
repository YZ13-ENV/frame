'use client'
import Avatar from "@/components/shared/avatar"
import { auth } from "@/utils/app"
import { CommentBlock, ShortUserData, user } from "@darkmaterial/api"
import { DateTime } from "luxon"
import Link from "next/link"
import { memo, useEffect, useMemo, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

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
  }, [comment])
  return (
    <div className="w-full h-fit rounded-lg p-3 flex gap-3">
      <Link href={author ? `/${author?.nickname || author.uid}` : ''}>
        {
          author && author.photoUrl
            ? <Avatar src={author.photoUrl} size={48} isSubscriber={author.isSubscriber || false} />
            : <div className="h-12 aspect-square rounded-full bg-muted shrink-0" />
        }
      </Link>
      <div className="w-full flex flex-col gap-1">
        <div className="w-fit h-fit flex items-center flex-row gap-2">
          <span className="text-sm text-accent-foreground">{author?.nickname || author?.displayName || 'Пользователь'}</span>
          <span className="text-sm text-muted-foreground">{DateTime.fromSeconds(comment.createdAt).setLocale('ru').toRelative()}</span>
        </div>
        <span className="text-base text-accent-foreground">{comment.text}</span>
      </div>
      {/* {
            isYou
              ? <Button onClick={() => onDelete && onDelete(comment.id)} disabled={disabled}
                size='icon' variant='destructive'><BiTrashAlt /></Button>
              : <button className="hidden" />
          } */}
    </div>
  )
}

export default memo(Comment)