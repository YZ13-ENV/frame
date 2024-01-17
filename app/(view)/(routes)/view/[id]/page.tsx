import ShotAdaptiveWrapper from "@/components/shared/shot-adaptive-wrapper"
import { cookies } from "next/headers";
import ShotHeader from "../../../_components/shot-header";
import { bum } from "@/api/bum";
import { Suspense } from "react";
import ShotHeaderSkeleton from "@/components/skeletons/shot-header";
import { DateTime } from "luxon";
import MediaBlock from "../../../_components/blocks/media-block";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Separator } from "@/components/ui/separator";
import AuthorControls from "@/app/(view)/_components/author-controls";
import LikeButton from "@/components/shared/like-button";
import LastShots from "@/app/(view)/_components/last-shots";
import ViewWatcher from "@/app/(view)/_components/view-watcher";
import { notFound } from "next/navigation";
import Comments from "@/app/(view)/_components/comments";
import FollowButton from "@/app/(user)/_components/follow-button";
import AuthorWorks from "@/app/(view)/_components/author-works";


type Props = {
    params: {
        id: string
    }
}
const page = async({ params }: Props) => {
    const shotId = params.id
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const visitorId = uidCookie ? uidCookie.value : null
    const shot = shotId ? await bum.shot.get(shotId) : null
    const isYou = shot && visitorId ? shot.authorId === visitorId : false
    if (!shot) return notFound()
    return (
        <>
            <div className="w-full h-0" />
            <Suspense fallback={ <ShotHeaderSkeleton /> }>
                <ShotHeader statistics={{ likes: shot.likes.length || 0, views: shot.views.length || 0 }}
                authorId={shot.authorId} visitorId={visitorId || ''} />
            </Suspense>
            <ViewWatcher shotId={shot.doc_id} views={shot.views} />
            <div className="w-full h-full flex flex-col border-b bg-card">
                {
                    isYou &&
                    <AuthorControls shot={shot} />
                }
                <div className="view-block-wrapper view-wrapper-paddings">
                    <ShotAdaptiveWrapper noPaddings>
                        <MediaBlock key={shot.rootBlock.id + '-' + shot.rootBlock.type + '-shot'} attachments={shot.attachments} block={shot.rootBlock} />
                    </ShotAdaptiveWrapper>
                    <aside className="view-side">
                        <div className='flex items-center gap-2'>
                            <span className="text-xl font-semibold">{ shot.title }</span>
                        </div>
                        <div className="w-full h-fit flex items-center justify-between">
                            <div className="w-fit h-fit flex items-center">
                                {
                                    isYou
                                    ? <button className="h-9 w-32 rounded-md bg-muted"></button>
                                    : visitorId ? <FollowButton from={visitorId} to={shot.authorId} /> : <button className="h-9 w-32 rounded-md bg-muted"></button>
                                }
                            </div>
                            <div className="w-fit h-fit flex items-center gap-2">
                                <LikeButton id={shot.doc_id} defaultValue={!!shot.likes.find(like => visitorId ? like.uid === visitorId : false)} />
                            </div>
                        </div>
                        <div className="w-full h-fit p-2 rounded-lg bg-muted">
                            <span className="text-sm text-muted-foreground">{DateTime.fromSeconds(shot.createdAt).setLocale('ru').toRelative()}</span>
                            <div className="w-full h-fit flex items-start gap-1 mt-2 flex-wrap">
                                {
                                    shot.tags.map(tag => <span key={tag} className="px-2 py-1 rounded-md border text-xs bg-background">{tag}</span>)
                                }
                            </div>
                        </div>
                        <Comments comments={shot.comments} shotId={shot.doc_id}
                        isCommentsEnabled={shot.needFeedback} />
                        {/* <div className="w-full h-fit flex flex-col gap-2">
                            <div className="w-full h-6 rounded-md bg-muted"></div>
                            <div className="w-2/3 h-6 rounded-md bg-muted"></div>
                            <div className="w-1/3 h-6 rounded-md bg-muted"></div>
                            <div className="w-1/2 h-6 rounded-md bg-muted"></div>
                        </div> */}
                    </aside>
                </div>
            </div>
            <div className="w-full h-full flex flex-col border-b">
                <div className="view-block-wrapper view-wrapper-paddings">
                    <ShotAdaptiveWrapper noPaddings>
                        {
                            shot.blocks.map(block => {
                                if (block.type === 'media') return <MediaBlock key={block.id + '-' + block.type + '-shot'} attachments={shot.attachments} block={block} />
                                if (block.type === 'text') return <div className="w-full md-layout" key={block.id + '-' + block.type + '-shot'}>
                                    <MDXRemote source={block.text} />
                                </div>
                                if (block.type === 'separator')  return <Separator key={block.id + '-' + block.type + '-shot'} />
                                return null
                            })
                        }
                    </ShotAdaptiveWrapper>
                    <aside className="view-side-empty">
                    </aside>
                </div>
            </div>
            <AuthorWorks authorId={shot.authorId} />
        </>
    )
}

export default page