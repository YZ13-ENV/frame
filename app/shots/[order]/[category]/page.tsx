import AdvancedChunk from "@/components/widgets/Chunks/ShotsChunk"
import { bumAPI } from "@darkmaterial/api"

type Props = {
    params: {
        order: string
        category: string
    }
}
const ShotsByCategoryPage = ({ params }: Props) => {
    return (
        <AdvancedChunk getter={ bumAPI.shots.all } props={{ order: params.order, category: params.category }} />
    )
}

export default ShotsByCategoryPage