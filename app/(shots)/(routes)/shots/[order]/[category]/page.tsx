import { bum } from "@/api/bum"
import Loading from "../loading"
import AdvancedChunk from "@/components/widgets/chunk"
import { Suspense } from "react"


type Props = {
    params: {
        order: string
        category: string
    }
}
const page = ({ params }: Props) => {
    return (
        <Suspense fallback={ <Loading /> }>
            <div className="w-full h-full z-20 grid shots_grid gap-6">
                <AdvancedChunk getter={ bum.shots.all } order={params.order} category={params.category} />
            </div>
        </Suspense>
    )
}

export default page