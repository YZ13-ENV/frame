import AdvancedChunk from '@/components/widgets/chunk'
import { bum } from '@/api/bum'

type Props = {
    params: {
        order: string
    }
}
const page = ({ params }: Props) => {
    return (
        <div className="w-full h-full z-20 grid shots_grid gap-6">
            <AdvancedChunk getter={ bum.shots.all } order={params.order} />
        </div>
    )
}

export default page