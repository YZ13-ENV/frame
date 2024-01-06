import { ChunkResponse } from "@/types/common"
import Controller from "./ui/controller"
import { DocShotData } from "@/types/shot"
import ShotCard from "@/components/shared/shot-card"

type Props = {
    uid?: string
    order?: string
    category?: string
    hideController?: boolean
    getter: ({ uid, order, category }: {
        uid?: string
        order?: string | undefined;
        category?: string | undefined;
    }) => Promise<ChunkResponse<DocShotData[]>>
}

async function AdvancedChunk({ getter, hideController=false, uid, category, order }: Props) {
    const { data, next } =  uid ? await getter({uid, order, category}) : await getter({order, category})
    return (
        <>
            { data && data.map( item => <ShotCard key={item.doc_id} shot={item} />) }
            { !hideController && <Controller next={next} />}
        </>
    )
}

export default AdvancedChunk