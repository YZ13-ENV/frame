import type { ChunkResponse } from "@darkmaterial/core/types"
import Controller from "./ui/Controller"
import TagCard from "./ui/TagCard"

type Props = {
    getter: () => Promise<ChunkResponse<string[]>>
}

async function AdvancedChunk({ getter }: Props) {
    const { data, next } = await getter()
    return (
        <>
            { data && data.map( item => <TagCard key={item} tag={item} />) }
            <Controller next={next} />
        </>
    )
}

export default AdvancedChunk