import { bum } from "@/api/bum"
import AdvancedChunk from "@/components/widgets/chunk"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Props = {
  params: {
    query: string
    order: string
  }
}
const page = ({ params }: Props) => {
  const cookiesList = cookies()
  const uidCookie = cookiesList.get('uid')
  const visitorId = uidCookie ? uidCookie.value : null
  const isFollowingOrder = params.order === 'following'
  if (isFollowingOrder && !visitorId) return redirect(`/search/${params.query}/popular`)
  if (isFollowingOrder && visitorId) return <AdvancedChunk getter={ bum.shots.search(params.query, params.order, undefined, visitorId) } />
  return <AdvancedChunk getter={ bum.shots.search(params.query, params.order, undefined) } />
}

export default page