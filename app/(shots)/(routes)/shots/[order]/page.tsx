import dynamic from 'next/dynamic'
import { bum } from '@/api/bum'
import Loading from './loading'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const AdvancedChunk = dynamic(() => import('@/components/widgets/chunk'), {
    loading: () => <Loading />
})

type Props = {
    params: {
        order: string
    }
}
const page = ({ params }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const visitorId = uidCookie ? uidCookie.value : null
    const isFollowingOrder = params.order === 'following'
    if (isFollowingOrder && !visitorId) return redirect('/shots/popular')
    if (isFollowingOrder && visitorId) return <AdvancedChunk getter={ bum.shots.all(params.order, undefined, visitorId) } />
    return <AdvancedChunk getter={ bum.shots.all(params.order, undefined, undefined) } />
}

export default page