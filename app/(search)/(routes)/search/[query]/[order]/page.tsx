import AdvancedChunk from "@/components/widgets/chunk"
import { getVisitorId } from "@/helpers/cookies"
import { bum } from "@darkmaterial/api"
import { redirect } from "next/navigation"

type Props = {
  params: {
    query: string
    order: string
  }
}
const page = ({ params }: Props) => {
  const visitorId = getVisitorId()
  const isFollowingOrder = params.order === 'following'
  if (isFollowingOrder) {
    if (visitorId) {
      return <AdvancedChunk getter={bum.shots.search(params.query, params.order, undefined, visitorId)} />
    } else return redirect(`/search/${params.query}/popular`)
  } else return <AdvancedChunk getter={bum.shots.search(params.query, params.order, undefined)} />
}

export default page