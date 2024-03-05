import AdvancedChunk from "@/components/widgets/chunk"
import { getVisitorId } from "@/helpers/cookies"
import { bum } from "api"
import { redirect } from "next/navigation"

type Props = {
  params: {
    query: string
    order: string
    category: string
  }
}
const page = ({ params }: Props) => {
  const visitorId = getVisitorId()
  const isFollowingOrder = params.order === 'following'
  if (isFollowingOrder) {
    if (visitorId) {
      return <AdvancedChunk getter={bum.shots.search(params.query, params.order, params.category, visitorId)} />
    } else return redirect(`/search/${params.query}/popular/${params.category}`)
  } else return <AdvancedChunk getter={bum.shots.search(params.query, params.order, params.category)} />
}

export default page