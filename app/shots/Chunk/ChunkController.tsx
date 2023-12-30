'use client'
import { DocShotData } from '@darkmaterial/core/types'
import { auth } from '@darkmaterial/core/utils'
import Link from 'next/link'
import { memo, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiLoaderAlt } from 'react-icons/bi'
import { Button } from '@darkmaterial/ui/shadcn'
import { ShotCard } from '@darkmaterial/ui/widgets'

type Props = {
    chunks: string[]
    lastChunk: number
}
const fetchChunk = async(link: string) => {
    try {
        const res = await fetch(link, {
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
const ChunkController = ({ chunks, lastChunk }: Props) => {
    const [user] = useAuthState(auth)
    const [items, setItems] = useState<DocShotData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const loadChunk = async() => {
        setLoading(true)
        const chunkLink = chunks[currentIndex]
        if (chunkLink) {
            const fetchedChunk = await fetchChunk(chunkLink)
            setLoading(false)
            setCurrentIndex(currentIndex + 1)
            if (fetchedChunk) setItems([ ...items, ...fetchedChunk ])
        } else setLoading(false)
    }
    return (
        <>
            { items.map(item => <ShotCard key={item.doc_id} shot={item} />) }
            <div className="flex items-center justify-center w-full mb-32 col-span-full h-fit">
            {
                user
                ?
                    chunks.length === 0
                    ? null
                    : (lastChunk - 1) === currentIndex
                    ? <span className='text-sm text-neutral-400'>Вы дошли до конца списка</span>
                    : <Button disabled={(lastChunk - 1) === currentIndex || loading} onClick={loadChunk}>
                        { loading && <BiLoaderAlt size={17} className='animate-spin mb-0.5 mr-1' /> }
                        Загрузить ещё
                    </Button>
                :
                    chunks.length === 0
                    ? null
                    : currentIndex === 1
                    ? <div className="flex items-center h-full gap-4 w-fit">
                        <Link href='https://darkmaterial.space/auth/signin?back_url=https://bum.darkmaterial.space'>
                            <Button variant='ghost'>Войти</Button>
                        </Link>
                        <Link href='https://darkmaterial.space/auth/signup?back_url=https://bum.darkmaterial.space'>
                            <Button variant='default'>Регистрация</Button>
                        </Link>
                    </div>
                    : <Button disabled={loading || currentIndex === 1} onClick={loadChunk}>
                        { loading && <BiLoaderAlt size={17} className='animate-spin mb-0.5 mr-1' /> }
                        Загрузить ещё
                    </Button>
            }
            </div>
        </>
        
    )
}

export default memo(ChunkController)