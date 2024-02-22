import Controller from "./ui/controller"
import { Suspense } from "react"
import ShotSkeleton from "@/components/skeletons/shot"
import dynamic from "next/dynamic"
import { ChunkResponse, DocShotData } from "api"
const ShotCard = dynamic(() => import("@/components/shared/shot-card"), {
    loading: () => <ShotSkeleton />
})

type Props = {
    hideController?: boolean
    getter: Promise<ChunkResponse<DocShotData[]>>
}

const AdvancedChunk = async ({ getter, hideController }: Props) => {
    const { data, next } = await getter
    return (
        <>
            {
                (!data || (data && data.length === 0)) && <div className="w-full col-span-full h-96 mx-auto flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Работ не найдено</span>
                </div>
            }
            {data && data.map(item => <Suspense key={item.doc_id} fallback={<ShotSkeleton />}><ShotCard enableOutline shot={item} /></Suspense>)}
            {(!hideController && data.length !== 0) && <Controller next={next} />}
        </>
    )
}

export default AdvancedChunk