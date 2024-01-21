import Controller from "./ui/controller"
import ShotCard from "@/components/shared/shot-card"
import { Suspense } from "react"
import ShotSkeleton from "@/components/skeletons/shot"
import { ChunkResponse } from "@/types/common"
import { DocShotData } from "@/types/shot"

type Props = {
    hideController?: boolean
    getter: Promise<ChunkResponse<DocShotData[]>>
}

const AdvancedChunk = async ({ getter, hideController }: Props) => {
    const { data, next } = await getter
    return (
        <>
            {
                !data || data && data.length === 0 && <div className="w-full col-span-full h-96 mx-auto flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Работ не найдено</span>
                </div>
            }
            { data && data.map( item => <Suspense key={item.doc_id} fallback={<ShotSkeleton />}><ShotCard shot={item} /></Suspense> ) }
            { (!hideController && data.length !== 0) && <Controller next={next} />}
        </>
    )
}

export default AdvancedChunk