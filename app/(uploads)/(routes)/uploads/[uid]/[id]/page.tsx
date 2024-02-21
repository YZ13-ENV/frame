import Blocks from '@/app/(uploads)/_components/upload/blocks'
import Controls from '@/app/(uploads)/_components/upload/header/controls'
import Side from '@/app/(uploads)/_components/upload/side'
import ViewBlocks from '@/app/(uploads)/_components/upload/view-blocks'
import RootBlock from '@/app/(uploads)/_components/upload/view-blocks/root-block'
import Title from '@/app/(uploads)/_components/upload/view-blocks/title'
import ShotAdaptiveWrapper from '@/components/shared/shot-adaptive-wrapper'
import { getVisitorId } from '@/helpers/cookies'
import { author_config, fetch_author } from '@/helpers/portfolio-fetcher'
import { bum } from 'api'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    uid: string
    id: string
  }
}
const page = async ({ params }: Props) => {
  const { uid, id } = params
  const visitorId = getVisitorId()
  const author = await fetch_author(uid)
  const config = author ? author_config(author) : null
  const shot = await bum.shot.get(id)
  const draft = await bum.draft.get(id)
  const result = shot || draft
  const isSubscriber = author && author.type === 'team' ? true : author ? author.isSubscriber : false
  const hasTeam = config ? config.isTeam : false
  const isAuthor = visitorId && result ? visitorId === result.authorId : false
  if (!hasTeam) return redirect(`/uploads/shot`)
  if (
    config && config.isNickname && author && config.data.type === 'user' && config.data.nickname
    && uid !== config.data.nickname
  ) return redirect(`/uploads/${config.data.nickname}/${id}`)
  if (!isAuthor || !result) return "don't have access"
  return (
    //         { grid && <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' /> }
    <div className="relative flex flex-col items-center justify-center w-full h-screen">
      <Controls showPublish />
      <Side teamId={uid} title={result.title} draft={result} hasSubscription={isSubscriber} />
      <Blocks />
      <div className="w-full pt-24 mx-auto overflow-y-auto no-scrollbar">
        <ShotAdaptiveWrapper>
          <Title />
          <RootBlock />
          <ViewBlocks />
        </ShotAdaptiveWrapper>
      </div>
    </div>
  )
}

export default page