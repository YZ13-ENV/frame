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
    return (
        <div className="w-full h-full z-20 grid shots_grid gap-6">
            <AdvancedChunk getter={ bum.shots.all } order={params.order} category={params.category} />
        </div>
    )
}

export default page