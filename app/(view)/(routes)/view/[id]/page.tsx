import FollowButton from "@/app/(user)/_components/follow-button";
import Author from "@/app/(view)/_components/author";
import EditButton from "@/app/(view)/_components/author-controls/edit-button";
import AuthorWorks from "@/app/(view)/_components/author-works";
import BlurRootBlock from "@/app/(view)/_components/blocks/blur-root-block";
import MediaBlock from "@/app/(view)/_components/blocks/media-block";
import Comments from "@/app/(view)/_components/comments";
import ScrollSide from "@/app/(view)/_components/side/scroll-side";
import LikeButton from "@/components/shared/like-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getVisitorId } from "@/helpers/cookies";
import { bum } from "@darkmaterial/api";
import { DateTime } from "luxon";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from "next/navigation";
import { BiDotsVerticalRounded, BiShare } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";


type Props = {
    params: {
        id: string
    }
}
const page = async ({ params }: Props) => {
    const shotId = params.id
    const visitorId = getVisitorId()
    const shot = shotId
        ? await bum.shot.get(shotId)
        : null
    const teamId = shot ? shot.teamId : undefined
    const isYou = shot && visitorId ? shot.authorId === visitorId : false
    const isLiked = shot && visitorId ? shot.likes.findIndex(item => item.uid === visitorId) > -1 : false
    if (!shot) return notFound()
    return (
        <>
            <div className="w-full relative my-10">
                <BlurRootBlock shot={shot} />
                <div className="relative max-w-7xl mx-auto w-full min-h-screen flex items-start gap-6 px-6">
                    <div className="w-full space-y-6 py-6">
                        <div className="max-w-5xl w-full mx-auto flex flex-col gap-2">
                            <h2 className="">{shot.title}</h2>
                            <div className='w-full flex items-center justify-between'>
                                <span className="text-sm text-muted-foreground normal-case">
                                    {DateTime.fromSeconds(shot.createdAt).setLocale("ru").toRelative()}
                                </span>
                                <div className='flex items-center gap-2'>
                                    {
                                        isYou &&
                                        <EditButton shot={shot} />
                                    }
                                    <Button
                                        className="rounded-full gap-2"
                                        variant="secondary"
                                    >
                                        <BsEyeFill size={16} />
                                        <span className="text-sm">{shot.views.length}</span>
                                    </Button>
                                    {/* <button className="w-36 h-9 rounded-sm bg-muted" /> */}
                                    {/* <button className="w-24 h-9 rounded-sm bg-muted" /> */}
                                </div>
                            </div>
                        </div>
                        <div id="overview" className="max-w-5xl w-full mx-auto flex flex-col gap-2">
                            <MediaBlock key={shot.rootBlock.id + '-' + shot.rootBlock.type + '-shot'} attachments={shot.attachments} block={shot.rootBlock} />
                        </div>
                        <div className="max-w-5xl w-full mx-auto flex flex-col gap-4">
                            <div className="flex md:!flex-row flex-col w-full items-center gap-4 justify-between">
                                <div className="w-fit flex items-center justify-start gap-4">
                                    <Author id={shot.authorId} teamId={teamId} />
                                    {/* <Button
                                className="rounded-full bg-secondary/75 backdrop-blur-sm gap-2"
                                variant="secondary"
                            >
                                Вы подписаны
                            </Button> */}
                                    {visitorId && <FollowButton from={visitorId} to={shot.authorId} />}
                                    {/* <button className="w-36 h-9 rounded-sm bg-muted" /> */}
                                </div>
                                <div className="w-fit flex items-center justify-end gap-2">
                                    <LikeButton id={shot.doc_id} teamId={shot.teamId} defaultValue={isLiked} />
                                    <div className="flex items-center">
                                        <Button
                                            className="rounded-full !rounded-r-none gap-2"
                                            variant="secondary"
                                        >
                                            <BiShare />
                                            Поделиться
                                        </Button>
                                        <Button
                                            className="rounded-full !rounded-l-none gap-2"
                                            variant="secondary"
                                            size="icon"
                                        ><BiDotsVerticalRounded size={16} /></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <Separator /> */}
                        {
                            !!shot.blocks.length &&
                            <>
                                <div id="content" className="max-w-5xl w-full mx-auto flex flex-col gap-2 py-12">
                                    {
                                        shot.blocks.map(block => {
                                            if (block.type === 'media') return <MediaBlock key={block.id + '-' + block.type + '-shot'} attachments={shot.attachments} block={block} />
                                            if (block.type === 'text') return <div className="w-full md-layout" key={block.id + '-' + block.type + '-shot'}>
                                                <MDXRemote source={block.text} />
                                            </div>
                                            if (block.type === 'separator') return <Separator key={block.id + '-' + block.type + '-shot'} />
                                            return null
                                        })
                                    }
                                </div>
                                {/* <Separator /> */}
                            </>
                        }
                    </div>
                    <ScrollSide />
                </div>
            </div>
            <div id="more-from-author" className="px-6 w-full mx-auto flex md:!flex-row flex-col gap-6">
                <div id="commentary" className="lg:!w-1/5 md:!w-1/3 w-full flex flex-col gap-4">
                    <div className="flex flex-row flex-wrap gap-1.5 items-start justify-start">
                        {
                            shot.tags.map(
                                tag => <span
                                    key={`${tag}-${shot.doc_id}`}
                                    className="h-7 inline-flex items-center text-sm rounded-full px-3 bg-secondary text-secondary-foreground"
                                >
                                    {tag}
                                </span>
                            )
                        }
                    </div>
                    <Comments comments={shot.comments} shotId={shot.doc_id} teamId={teamId}
                        isCommentsEnabled={shot.needFeedback} />
                </div>
                <div className="lg:!w-4/5 md:!w-2/3 w-full">
                    <AuthorWorks authorId={shot.authorId} />
                </div>
            </div>
        </>
    )
    // return (
    //     <>
    //         <div className="w-full h-0" />
    //         <Suspense fallback={<ShotHeaderSkeleton />}>
    //             <ShotHeader statistics={{ likes: shot.likes.length || 0, views: shot.views.length || 0 }}
    //                 authorId={shot.authorId} teamId={teamId} />
    //         </Suspense>
    //         <ViewWatcher shotId={shot.doc_id} views={shot.views} />
    //         <div className="relative w-full h-full flex flex-col bg-gradient-to-t from-bg-card to-background">
    //             {
    //                 isYou &&
    //                 <AuthorControls shot={shot} />
    //             }
    //             <div className="view-block-wrapper view-wrapper-paddings z-10 relative">
    //                 {/* <div className="absolute top-0 left-0 w-full z-[-1] aspect-video backdrop-blur-3xl bg-transparent"></div> */}
    //                 <div className="absolute top-0 left-0 w-full z-[-2] scale-90 aspect-video blur-3xl">
    //                     <MediaBlock key={shot.rootBlock.id + '-' + shot.rootBlock.type + '-shot'} attachments={shot.attachments} block={shot.rootBlock} />
    //                 </div>
    //                 <ShotAdaptiveWrapper noPaddings>
    //                     <MediaBlock key={shot.rootBlock.id + '-' + shot.rootBlock.type + '-shot'} attachments={shot.attachments} block={shot.rootBlock} />
    //                 </ShotAdaptiveWrapper>
    //                 <aside className="view-side">
    //                     <div className='flex items-center gap-2'>
    //                         <span className="text-xl font-semibold">{shot.title}</span>
    //                     </div>
    //                     <div className="w-full h-fit flex items-center justify-between">
    //                         <div className="w-fit h-fit flex items-center">
    //                             {
    //                                 isYou
    //                                     ? <button className="h-9 w-32 rounded-md bg-muted"></button>
    //                                     : visitorId
    //                                         ? <FollowButton from={visitorId} to={shot.authorId} /> : <button className="h-9 w-32 rounded-md bg-muted"></button>
    //                             }
    //                         </div>
    //                         <div className="w-fit h-fit flex items-center gap-2">
    //                             <LikeButton id={shot.doc_id} teamId={teamId}
    //                                 defaultValue={!!shot.likes.find(like => visitorId ? like.uid === visitorId : false)} />
    //                         </div>
    //                     </div>
    //                     <div className="w-full h-fit p-2 rounded-lg bg-muted">
    //                         <span className="text-sm text-muted-foreground">{DateTime.fromSeconds(shot.createdAt).setLocale('ru').toRelative()}</span>
    //                         <div className="w-full h-fit flex items-start gap-1 mt-2 flex-wrap">
    //                             {
    //                                 shot.tags.map(tag => <span key={tag} className="px-2 py-1 rounded-md border text-xs bg-background">{tag}</span>)
    //                             }
    //                         </div>
    //                     </div>
    //                     <Comments comments={shot.comments} shotId={shot.doc_id} teamId={teamId}
    //                         isCommentsEnabled={shot.needFeedback} />
    //                     {/* <div className="w-full h-fit flex flex-col gap-2">
    //                         <div className="w-full h-6 rounded-md bg-muted"></div>
    //                         <div className="w-2/3 h-6 rounded-md bg-muted"></div>
    //                         <div className="w-1/3 h-6 rounded-md bg-muted"></div>
    //                         <div className="w-1/2 h-6 rounded-md bg-muted"></div>
    //                     </div> */}
    //                 </aside>
    //             </div>
    //         </div>
    //         <Line orientation="horizontal" variant="primary" />
    //         {
    //             !!shot.blocks.length &&
    //             <div className="w-full h-full flex flex-col">
    //                 <div className="view-block-wrapper view-wrapper-paddings">
    //                     <ShotAdaptiveWrapper noPaddings>
    //                         {
    //                             shot.blocks.map(block => {
    //                                 if (block.type === 'media') return <MediaBlock key={block.id + '-' + block.type + '-shot'} attachments={shot.attachments} block={block} />
    //                                 if (block.type === 'text') return <div className="w-full md-layout" key={block.id + '-' + block.type + '-shot'}>
    //                                     <MDXRemote source={block.text} />
    //                                 </div>
    //                                 if (block.type === 'separator') return <Separator key={block.id + '-' + block.type + '-shot'} />
    //                                 return null
    //                             })
    //                         }
    //                     </ShotAdaptiveWrapper>
    //                     <aside className="view-side-empty">
    //                     </aside>
    //                 </div>
    //             </div>
    //         }
    //         <AuthorWorks authorId={shot.authorId} />
    //     </>
    // )
}

export default page
