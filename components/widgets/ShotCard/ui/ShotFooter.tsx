import Link from 'next/link'
import { PiEyeDuotone, PiHeartDuotone } from 'react-icons/pi'
import type { DocShotData } from 'core/types'
import { Avatar } from '@ui/components/shared/Avatar'
import { Badge } from '@ui/shadcn/badge'
import { userAPI } from 'api/api/user'
// import React from 'react'

type Props = {
    shot: DocShotData
    asIntegration?: boolean
}
const ShotFooter = async({ shot, asIntegration }: Props) => {
    const user = await userAPI.byId.short(shot.authorId)
    if (!user) return (
        <div className="flex items-center justify-between w-full gap-2 px-2 h-fit shrink-0">
            <div className="w-24 rounded-lg h-7 bg-muted animate-pulse" />
            <div className="w-24 rounded-lg h-7 bg-muted animate-pulse" />
        </div>
    )
    return (
        <div className="flex items-center justify-between w-full gap-2 px-2 h-fit shrink-0">
            {
                user &&
                <Link href={asIntegration ? `https://bum.darkmaterial.space/${user.displayName}` : `/${user.displayName}`} 
                className="flex items-center gap-2 overflow-visible w-fit h-fit">
                    <Avatar src={user.photoUrl} size={28} noLabel isSub={user.isSubscriber} />
                    <span className='font-medium line-clamp-1 text-neutral-500 dark:text-neutral-300'>{user.displayName}</span>
                    <Badge variant={user.isSubscriber ? 'default' : 'secondary'} className='px-1.5 rounded-md'>{user.isSubscriber ? 'DM+' : 'Хобби'}</Badge>
                </Link>
            }
            <div className="flex items-center gap-2 w-fit h-fit">
                <span className='inline-flex items-center gap-1 text-sm'>
                    <PiHeartDuotone size={18} />
                    <span className='text-inherit'>{shot.likes.length}</span>
                </span>
                <span className='inline-flex items-center gap-1 text-sm'>
                    <PiEyeDuotone size={18} />
                    <span className='text-inherit'>{shot.views.length}</span>
                </span>
            </div>
        </div>
    )
}

export default ShotFooter