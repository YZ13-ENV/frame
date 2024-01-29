import NewDraftButton from "@/app/(uploads)/_components/hub/new-draft-button"
import Controls from "@/app/(uploads)/_components/upload/header/controls"
import AdvancedChunk from "@/components/widgets/draft-chunk"
import Header from "@/components/widgets/header"
import { getVisitorId } from "@/helpers/cookies"
import { author_config, fetch_author } from "@/helpers/portfolio-fetcher"
import { bum } from "api"
import { redirect } from "next/navigation"

type Props = {
  params: {
    uid: string
  }
}
const page = async({ params }: Props) => {
  const { uid } = params
  const visitorId = getVisitorId()
  const author = await fetch_author(uid)
  const config = author ? author_config(author) : null
  const isMember = config && visitorId && config.data.type === 'team'
  ? config.data.members.includes(visitorId) || config.data.founder === visitorId
  : false
  const hasTeam = config ? config.isTeam : false
  if (!hasTeam) return redirect(`/uploads/shot`)
  if (config && config.isTeam && !isMember) return 'not a team member'
  if (
    config && config.isNickname && author && config.data.type === 'user' && config.data.nickname
    && uid !== config.data.nickname
  ) return redirect(`/uploads/${config.data.nickname}`)
  return (
    <div className="w-full h-full flex relative flex-col items-center justify-center">
        <Controls />
        <Header />
        <div className="max-w-5xl w-full mx-0 pt-24 flex flex-col px-6">
            <div className="w-full h-fit flex items-center justify-between">
                <h2 className='text-xl font-bold'>Черновики</h2>
                <NewDraftButton />
            </div>
            <div className="w-full h-fit flex flex-col py-6 gap-6">
                  <AdvancedChunk getter={ bum.drafts.byUser(uid) } />
            </div>
        </div>
    </div>
  )
}

export default page