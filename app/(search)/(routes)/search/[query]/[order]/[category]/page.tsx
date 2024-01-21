import { bum } from "@/api/bum"
import AdvancedChunk from "@/components/widgets/chunk"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Props = {
  params: {
    query: string
    order: string
    category: string
  }
}
const page = ({ params }: Props) => {
  const cookiesList = cookies()
  const uidCookie = cookiesList.get('uid')
  const visitorId = uidCookie ? uidCookie.value : null
  const isFollowingOrder = params.order === 'following'
  if (isFollowingOrder && !visitorId) return redirect(`/search/${params.query}/popular/${params.category}`)
  if (isFollowingOrder && visitorId) return <AdvancedChunk getter={ bum.shots.search(params.query, params.order, params.category, visitorId) } />
  return <AdvancedChunk getter={ bum.shots.search(params.query, params.order, params.category) } />
}

export default page