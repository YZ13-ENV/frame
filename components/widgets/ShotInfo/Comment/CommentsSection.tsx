'use client'
import React, { Suspense, useLayoutEffect, useState } from 'react'
import Comment from './Comment'
import CommentContent from './CommentContent'
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import CommentsWrapper from './CommentsWrapper'
import { DocShotData, ShotData } from '@darkmaterial/core/types'
import { db } from '@darkmaterial/core/utils'
import { bum } from '@darkmaterial/api/helpers'

type Props = {
    authorId: string
    shotId: string
    comments: DocShotData['comments']
}
const CommentsSection = ({ comments, authorId, shotId }: Props) => {
    const [commentsList, setCommentsList] = useState<DocShotData['comments']>(comments)
    const [value, loading] = useDocument( doc(db, 'users', authorId, 'shots', shotId) )
    useLayoutEffect(() => {
        if (value && value.exists()) {
            const snapData = value.data() as ShotData
            const snapComments: DocShotData['comments'] = snapData['comments']
            setCommentsList(snapComments)
        }

    },[value])
    return (
        <CommentsWrapper>
            {   
                commentsList.length === 0
                ? <span className='mx-auto text-sm text-center text-neutral-300'>Никто не оставил комментарий :(</span>
                : commentsList.map(comment => {
                    const grouped = bum.groupReactions(comment.reactions)
                    return (
                        <Comment key={comment.id}>
                            <Suspense fallback={'loading'}>
                                <CommentContent createdAt={comment.createdAt} text={comment.text} uid={comment.authorId} />
                            </Suspense>
                            { 
                                grouped.map(react => 
                                <div className='inline-flex gap-2 py-1 pl-2 pr-3 text-sm border rounded-full border-neutral-800' 
                                key={react.key}>
                                    <span>{react.emoji}</span>
                                    <span>{react.length}</span>
                                </div>)
                            }
                        </Comment>
                    )
                }
                )
            }
        </CommentsWrapper>
    )
}

export default CommentsSection