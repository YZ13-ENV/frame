import Controller from "./ui/Controller"
import type { ChunkResponse, DocShotData } from "@darkmaterial/core/types"
import { ShotCard } from '@darkmaterial/ui/widgets'

type Props<T> = {
    props: T
    getter: (params?: T) => Promise<ChunkResponse<DocShotData[]>>
}

async function AdvancedChunk<T>({ getter, props }: Props<T>) {
    const { data, next } = await getter(props)
    return (
        <>
            { data && data.map( item => <ShotCard key={item.doc_id} shot={item} />) }
            <Controller next={next} />
        </>
    )
}

export default AdvancedChunk