import { Suspense } from 'react'
import Image from 'next/image'
import { cdn } from '@darkmaterial/api/helpers'
import { bumAPI } from '@darkmaterial/api'
import TextBlock from './TextBlock'
import ViewDock from '@/components/widgets/Dock/view'
import ShotAdaptiveWrapper from '@/components/shared/ShotAdaptiveWrapper'
import ShotInfo from '@/components/widgets/ShotInfo'
import CommentsSection from '@/components/widgets/ShotInfo/Comment/CommentsSection'
import NewComment from '@/components/widgets/ShotInfo/Comment/NewComment'
import Sticker from './Sticker'
import Separator from './Separator'
import User from '@/components/widgets/ShotInfo/User'
import UserTools from '@/components/widgets/ShotInfo/UserTools'
import ViewRecorder from './ViewRecorder'
import Tags from '@/components/widgets/ShotInfo/Tags'
import LastWorks from '@/components/widgets/LastWorks'
import { Ambient } from '@darkmaterial/ui/shared'
import { DefaultFooter } from '@darkmaterial/ui/widgets'

type Props = {
    searchParams: {
        s: string | undefined
    }
}
const ViewPage = async({ searchParams }: Props) => {
    const shotId = searchParams.s
    const shotData = shotId ? bumAPI.shot.get(shotId) : null
    const [shot] = await Promise.all([shotData])
    const stableLink = shot?.rootBlock.type === 'image' || shot?.rootBlock.type === 'video' ? shot?.rootBlock.link : ''
    if (!searchParams.s || !shotId || !shot) return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <span className='text-2xl font-semibold text-neutral-300'>Такой работы нет</span>
            <ViewDock />
        </div>
    )
    return (
        <div className='flex flex-col w-full min-h-screen'>
        <ViewRecorder shot={shot} />
        <ViewDock shot={shot} />
            <div className="flex flex-col items-start w-full gap-12 pb-20 mx-auto md:flex-row max-w-7xl h-fit">
                <ShotAdaptiveWrapper>
                    <div className="z-40 flex items-center justify-center w-full h-fit">
                        <h1 className='text-4xl font-medium text-center text-accent-foreground'>{shot.title}</h1>
                    </div>
                    <div className="w-full relative aspect-[4/3]">
                        <Ambient link={cdn(stableLink)} />
                    </div>
                    <div className="z-20 flex flex-col w-full gap-2 h-fit">
                        <div className="flex items-center justify-between w-full gap-4 h-fit">
                            <div className="flex items-center gap-2 w-fit h-fit">
                                <Suspense fallback={
                                    <div className="flex items-center gap-2 w-fit h-fit">
                                        <div className="flex items-center gap-2 w-fit h-fit">
                                            <div className="rounded-full w-9 h-9 bg-card shrink-0" />
                                            <div className="flex flex-col justify-center gap-1 w-fit h-fit">
                                                <span className='w-32 h-4 rounded-md bg-card'></span>
                                                <span className='w-16 h-4 rounded-md bg-card'></span>
                                            </div>
                                        </div>
                                        <div className="rounded-lg w-28 h-9 bg-card"></div>
                                    </div>
                                }>
                                    <User shotId={shot.doc_id} uid={shot.authorId} />
                                </Suspense>
                            </div>
                            <Suspense fallback={
                                <div className="flex items-center gap-2 w-fit h-fit">
                                    <div className="rounded-lg w-28 h-9 bg-card"></div>
                                    <div className="w-12 rounded-lg h-9 bg-card"></div>
                                </div>
                            }>
                                <UserTools shotId={shot.doc_id} uid={shot.authorId} />
                            </Suspense>

                        </div>
                        <Tags createdAt={shot.createdAt} tags={shot.tags} views={shot.views.length} />
                    </div>
                    <div className="flex flex-col w-full gap-12 px-6 ">
                        {
                            shot.blocks.map((block, i) => {
                                if (block.type === 'text') return <TextBlock key={i} {...block} />
                                if (block.type === 'sticker') return <Sticker key={i} block={block} />
                                if (block.type === 'separator') return <Separator key={i} block={block} />
                                if (block.type === 'image' || block.type === 'video') {
                                    const isVideo = (block.link).endsWith('.mp4')
                                    if (isVideo) return (
                                        <div key={i} className="relative w-full h-fit ">
                                            <video key={i} autoPlay muted loop className="object-contain w-full h-full rounded-xl">
                                                <source src={cdn(block.link)} />
                                            </video>
                                        </div>
                                    )
                                    return (
                                        <div key={i} className="relative w-full h-fit">
                                            <Image src={cdn(block.link)} fill className="!relative object-contain rounded-xl" alt='img' />
                                        </div>
                                    )
                                }
                                return null
                            })
                        }
                    </div>
                    <div className="flex flex-col w-full gap-4 h-fit rounded-xl">
                        <NewComment authorId={shot.authorId} shotId={shot.doc_id} />
                        <CommentsSection comments={shot.comments} authorId={shot.authorId} shotId={shot.doc_id} />
                    </div>
                </ShotAdaptiveWrapper>
                <ShotInfo>
                    <LastWorks userId={shot.authorId} exclude={shot.doc_id} order='new' />
                </ShotInfo>
            </div>
            <DefaultFooter />
        </div>

    )
}

export default ViewPage