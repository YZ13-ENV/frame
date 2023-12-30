import React from 'react'
import { DateTime } from 'luxon'
// import fallbackImg from 'ui/assets/EmptyUser.svg'
import { Avatar } from '@darkmaterial/ui/shared'
import { userAPI } from '@darkmaterial/api'

type Props = {
    uid: string
    createdAt: number
    text: string
}
const CommentContent = async({ createdAt, text, uid }: Props) => {
    const user = await userAPI.byId.short(uid)
    if (!user) return null
    return (
        <div className="flex items-start w-full gap-2 h-fit">
            <Avatar size={36} src={user.photoUrl} isSub={user.isSubscriber} noLabel fallbackImage={'fallbackImg'} />
            <div className="flex flex-col w-full h-full gap-2">
                <div className="flex flex-col gap-1 w-fit h-fit">
                    <span className='text-sm font-medium text-neutral-200'>{user.displayName}</span>
                    <span className='text-xs text-neutral-400'>
                    {
                        DateTime.fromSeconds(createdAt)
                        .setLocale('ru').toRelativeCalendar()
                    }
                    </span>
                </div>
                <span className='text-sm text-neutral-300'>{text}</span>
            </div>
        </div>
    )
}

export default CommentContent