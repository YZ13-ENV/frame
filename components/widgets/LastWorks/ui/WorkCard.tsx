import { ThumbnailContent } from '@darkmaterial/ui/shared'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { DocShotData, ShortUserData } from '@darkmaterial/core/types'
import { userAPI } from '@darkmaterial/api'
import { format } from '@darkmaterial/api/helpers'

type Props = {
    shot: DocShotData
    index: number
}
const WorkCard = ({ shot, index }: Props) => {
    const [user, setUser] = useState<ShortUserData | null>(null)
    const isVideo = (shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link).endsWith('.mp4')
    const stableLink = shot.thumbnail ? shot.thumbnail.link : shot.rootBlock.link
    useEffect(() => {
        if (shot.authorId) {
            userAPI.byId.short(shot.authorId)
            .then(data => setUser(data))
        }
    },[shot.authorId])
    if (!user) return (
        <Link href={`/view?s=${shot.doc_id}`}  className="flex items-center w-full h-32 gap-4 shrink-0">
            <div className="h-full aspect-[4/3] rounded-lg bg-card border"></div>
            <div className="flex flex-col justify-start w-full h-full gap-2">
                <span className='w-full h-6 rounded-md bg-card' />
                <span className='w-2/3 h-6 rounded-md bg-card' />
                <div className="flex flex-col w-full gap-2 mt-2 h-fit">
                    <span className='w-1/2 h-4 rounded-md bg-card' />
                    <div className="flex items-center w-full gap-2 h-fit">
                        <span className='w-1/2 h-4 rounded-md bg-card' />
                        <span className='w-1/2 h-4 rounded-md bg-card' />
                    </div>
                </div>
            </div>
        </Link>
    )
    return (
        <Link href={`/view?s=${shot.doc_id}`} key={shot.doc_id + index} className="flex items-center w-full h-32 gap-4 group shrink-0">
            <div className={`aspect-[4/3] rounded-2xl ${process.env.NODE_ENV === 'development' && 'bg-card border transition-colors group-hover:border-secondary-foreground'} h-full`}>
                <ThumbnailContent vertical link={stableLink} />
            </div>
            <div className="flex flex-col items-start justify-start w-full min-h-full gap-2 h-fit">
                <span className='text-lg font-medium line-clamp-2 text-accent-foreground shrink-0'>{shot.title}</span>
                <span className='text-sm line-clamp-1 text-muted-foreground shrink-0'>{user.displayName || 'Пользователь'}</span>
                <div className="flex items-center w-full gap-2 h-fit">
                    <span className='text-sm shrink-0 line-clamp-1 text-muted-foreground'>{format.numbers(shot.views.length)} просмотров</span>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                    <span className='text-sm line-clamp-1 text-muted-foreground'>{DateTime.fromSeconds(shot.createdAt).setLocale('ru').toRelativeCalendar()}</span>
                </div>
            </div>
        </Link>
    )
}

export default WorkCard