import dynamic from 'next/dynamic'
import { bum } from '@/api/bum'
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
    return <AdvancedChunk getter={ bum.shots.all } order={params.order} category={params.category} />
}

export default page