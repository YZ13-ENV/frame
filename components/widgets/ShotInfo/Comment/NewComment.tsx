'use client'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { DateTime } from 'luxon'
import { BiLoaderAlt } from 'react-icons/bi'
import type { NewCommentBlock } from '@darkmaterial/core/types'
import { auth } from '@darkmaterial/core/utils'
import { host } from '@darkmaterial/core/const'
import { TextArea } from '@darkmaterial/ui/shared'
import { Button } from '@darkmaterial/ui/shadcn'

type Props = {
    authorId: string
    shotId: string
}
const NewComment = ({ authorId, shotId }: Props) => {
    const [user] = useAuthState(auth)
    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const addComment = async() => {
        if (user && text.length !== 0) {
            setLoading(true)
            const comment: NewCommentBlock = {
                'authorId': user.uid,
                'text': text,
                'createdAt': DateTime.now().toSeconds(),
                'answers': [],
                'reactions': []
            }
            const headers = new Headers()
            headers.set("Content-Type", "application/json")
            try {
                const res = await fetch(`${host}/shots/comment?userId=${authorId}&shotId=${shotId}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(comment)
                })
                if (res.ok) {
                    const isAdded = await res.json()
                    if (isAdded) {
                        setText('')
                    }
                    setLoading(false)
                } else setLoading(false)
            } catch(e) {
                console.log(e)
                setLoading(false)
            }

        }
    }
    if (user) {
        return (
            <div className="flex flex-col w-full justify-between gap-2 p-2 min-h-[9rem] rounded-xl border border-neutral-800">
            <TextArea onChange={e => setText(e.target.value)} value={text} placeholder='Что хотите сказать?' className='p-2 text-sm' />
            <div className="flex items-center justify-end w-full h-fit">
                <Button onClick={addComment} disabled={text.length < 2}>
                    { loading && <BiLoaderAlt size={18} className='mr-1 animate-spin' /> }
                    Отправить
                </Button>
            </div>
        </div>
        )
    }
    return (
        <div className='flex items-center justify-between w-full px-4 py-2 border h-fit rounded-xl border-neutral-800'>
            <span className='text-sm text-neutral300'>Для создания комментария вам необходимо войти в аккаунт</span>
        </div>
    )
}

export default NewComment