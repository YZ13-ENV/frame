import { Suspense } from 'react'
import Loading from './loading'
import AdvancedChunk from '@/components/widgets/chunk'
import { bum } from '@/api/bum'

type Props = {
    params: {
        order: string
    }
}
const page = ({ params }: Props) => {
    return (
        <Suspense fallback={ <Loading /> }>
            <div className="w-full h-full z-20 grid shots_grid gap-6">
                <AdvancedChunk getter={ bum.shots.all } order={params.order} />
            </div>
        </Suspense>
    )
}

export default page