import { ChunkResponse } from "@/types/common"
import Controller from "./ui/controller"
import { DocDraftShotData } from "@/types/shot"
import DraftCard from "@/components/shared/draft-card"

type Props = {
    hideController?: boolean
    getter: Promise<ChunkResponse<DocDraftShotData[]>>
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
            { data && data.map( item => <DraftCard key={item.doc_id} draft={item} />) }
            { (!hideController && data.length !== 0) && <Controller next={next} />}
        </>
    )
}

export default AdvancedChunk