import { bum } from "@darkmaterial/api"
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Loading from '../loading'
const AdvancedChunk = dynamic(() => import('@/components/widgets/chunk'), {
    loading: () => <Loading />
})

type Props = {
    params: {
        order: string
        category: string
    }
}
const page = ({ params }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const visitorId = uidCookie ? uidCookie.value : null
    const isFollowingOrder = params.order === 'following'
    if (isFollowingOrder && !visitorId) return redirect(`/shots/popular/${params.category}`)
    if (isFollowingOrder && visitorId) return <AdvancedChunk getter={bum.shots.all(params.order, params.category, visitorId)} />
    return <AdvancedChunk getter={bum.shots.all(params.order, params.category)} />
}

export default page