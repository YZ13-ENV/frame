import { bum } from '@/api/bum'
import AdvancedChunk from '@/components/widgets/Chunks/ShotsChunk'

type Props = {
    params: {
        order: string
    }
}
const OrderPage = ({ params }: Props) => {
    return (
        <AdvancedChunk getter={ bum.shots.all } props={{ order: params.order }} />
    )
}

export default OrderPage