import Link from "next/link"
import ChunkController from "./ChunkController"
import { bum } from '@darkmaterial/api/helpers'
import { host } from '@darkmaterial/core/const'
import type { DocShotData } from '@darkmaterial/core/types'
import { Button } from '@darkmaterial/ui/shadcn'
import { ShotCard } from '@darkmaterial/ui/widgets'


const getCountOfShots = async(countPrefix: string) => {
    try {
        const link = `${host}${countPrefix}`
        const res = await fetch(link, {
            method: "GET",
            next: { revalidate: 120 }
        })
        if (res.ok) {
            const count = parseInt(await res.json())
            return count
        } else return 0
    } catch(e) {
        return 0
    }

}
const getFirstChunk = async(shotsPrefix: string) => {
    try {
        const res = await fetch(`${host}${shotsPrefix}?skip=0`, {
            next: { revalidate: 120 }
        })
        if (res.ok) {
            const data: DocShotData[] = await res.json()
            return data
        } else {
            return null
        }
    } catch(e) {
        return null
    }
}
type Props = {
    countPrefix: string
    shotsPrefix: string
}
const Chunk = async({ countPrefix, shotsPrefix }: Props) => {
    const count = await getCountOfShots(countPrefix)
    const firstChunk = count !== 0 ? await getFirstChunk(shotsPrefix) : null
    const chunksCount = count <= 16 ? 0 : Math.ceil((count - 1) / 16)
    const chunks = bum.chunk(chunksCount, shotsPrefix)
    if (count === 0) return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-4 p-12 col-span-full shot_wrapper'>
            <span className='text-sm text-neutral-200'>Нет работ, вы можете быть первым</span>
            <Link href='/uploads/shot'>
                <Button>Загрузить работу</Button>
            </Link>
        </div>
    )
    return (
        <>
            { firstChunk && firstChunk.map(item => <ShotCard key={item.doc_id} shot={item} />) 
            }
            <ChunkController chunks={chunks} lastChunk={chunksCount} />
        </>
    )
}
export default Chunk