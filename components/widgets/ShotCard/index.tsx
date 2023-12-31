import { ReactNode, Suspense, memo } from 'react'
import Link from 'next/link'
import VideoIndicator from './ui/VideoIndicator'
import { ThumbnailContent } from '@ui/components/shared/ThumbnailContent'
import ShotFooter from './ui/ShotFooter'
import type { DocShotData } from 'core/types'

type Props = {
    shot: DocShotData
    asIntegration?: boolean
    hideFooter?: boolean
}
type Extensions = {
    Footer: typeof ShotFooter
    VideoIndicator: typeof VideoIndicator
    Thumbnail: typeof ThumbnailContent
}
const Shot = ({ shot, asIntegration, hideFooter=false }: Props): ReactNode => {
    const stableLink = shot.thumbnail ? shot.thumbnail.link : (shot?.rootBlock.type === 'image' || shot?.rootBlock.type === 'video') ? shot?.rootBlock.link : ''
    const isVideo = stableLink.endsWith('.mp4')
    return (
        <Suspense fallback={<div className='w-full aspect-[4/3] shrink-0 rounded-xl bg-neutral-900 animate-pulse' />}>
            <div className="relative flex flex-col w-full gap-2 group shrink-0 h-fit">
                {
                    isVideo && <VideoIndicator />
                }
                <Link href={
                        asIntegration 
                        ? `https://bum.darkmaterial.space/view?s=${shot.doc_id}` 
                        : '/view' + '?s=' + shot.doc_id
                    } 
                    className={`${process.env.NODE_ENV === 'development' ? 'bg-card' : 'border-transparent'} relative w-full h-full transition-all border rounded-2xl group-hover:border-neutral-500 dark:group-hover:border-neutral-200`}>
                    <div className="absolute top-0 z-10 flex items-end w-full h-full p-4 transition-all opacity-0 bg-gradient-to-t via-transparent from-white dark:from-black to-transparent hover:opacity-100 rounded-2xl">
                        <span className='font-medium line-clamp-1'>{shot.title}</span>
                    </div>
                    <ThumbnailContent link={stableLink} />
                </Link>
                {
                    !hideFooter && 
                    <Suspense fallback={
                        <div className='flex items-center justify-between w-full h-7'>
                            <div className="w-1/3 h-full rounded-lg bg-neutral-900 animate-pulse" />
                            <div className="w-1/3 h-full rounded-lg bg-neutral-900 animate-pulse" />
                        </div>
                    }>
                        <ShotFooter shot={shot} asIntegration={asIntegration} />
                    </Suspense>
                }
            </div>
        </Suspense>
    )
}

const ShotCard = memo(Shot)
export { ShotCard }