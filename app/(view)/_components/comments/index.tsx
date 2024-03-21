'use client'
import { Button } from "@/components/ui/button"
import { format } from "@/helpers/format"
import { auth } from "@/utils/app"
import { CommentBlock, DocShotData, bum, team } from "@darkmaterial/api"
import { DateTime } from "luxon"
import { Suspense, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { BiLoaderAlt } from "react-icons/bi"
import Comment from "./comment"
import EmptyComments from "./empty-comments"
import NewCommentForm from "./new-comment-form"

type Props = {
  isCommentsEnabled: boolean
  comments: DocShotData['comments']
  shotId: string
  teamId?: string
}
const Comments = ({ isCommentsEnabled, teamId, comments, shotId }: Props) => {
  const [user] = useAuthState(auth)
  const [syncedComments, setSyncedComments] = useState<DocShotData['comments']>(comments)
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const disabled = text.length === 0 || !user || loading
  const sendComment = async () => {
    if (user) {
      setLoading(true)
      const comment: CommentBlock = {
        id: format.generateId(6) as string,
        authorId: user.uid,
        text: text,
        createdAt: DateTime.now().toSeconds(),
        answers: []
      }
      const updatedComments = teamId
        ? await team.shot.addComment(teamId, shotId, comment)
        : await bum.shot.addComment(shotId, comment)
      setSyncedComments(updatedComments)
      setText('')
      setLoading(false)
    }
  }
  const deleteComment = async (commentId: string) => {
    if (user) {
      const isDeleted = teamId
        ? await team.shot.deleteComment(teamId, shotId, commentId)
        : await bum.shot.deleteComment(shotId, commentId)
      if (isDeleted) {
        const updatedComments = syncedComments.filter(comment => comment.id !== commentId)
        setSyncedComments(updatedComments)
      }
    }
  }
  if (!isCommentsEnabled) return (
    <div className="w-full flex flex-col items-center h-24 justify-center bg-muted rounded-xl">
      <span className="text-center text-sm text-muted-foreground">Комментарии отключены</span>
    </div>
  )
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h4>{syncedComments.length} комментарий</h4>
      <div className="w-full h-fit flex flex-col gap-2 mb-2">
        <NewCommentForm text={text} setText={setText} />
        {text && <Button disabled={disabled} onClick={sendComment} className='w-full gap-2'>
          {loading && <BiLoaderAlt className='animate-spin' />}
          Добавить
        </Button>
        }
      </div>
      <div className="w-full h-full flex flex-col gap-2 overflow-y-auto">
        {
          syncedComments.length
            ? syncedComments
              .sort((a, b) => b.createdAt - a.createdAt)
              .map(comment =>
                <Suspense fallback={<div className='w-full h-20 rounded-lg bg-muted animate-pulse' />}>
                  <Comment key={comment.id} onDelete={deleteComment} comment={comment} />
                </Suspense>
              )
            : !text && <EmptyComments />
        }
      </div>
    </div>
  )
}

export default Comments
// 654 - 272 = 382