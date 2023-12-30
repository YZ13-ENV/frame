'use client'
import { Button } from '@darkmaterial/ui/shadcn'
import { useState } from 'react'
import { hostV2 } from '@darkmaterial/core/const'
import { ChunkResponse, DocShotData } from '@darkmaterial/core/types'
import { authorizationHeader } from '@darkmaterial/api/helpers'
import { BiLoaderAlt } from 'react-icons/bi'
import { ShotCard } from '@darkmaterial/ui/widgets'

type Props = {
    next: string
}
function Controller({ next }: Props) {
    const [items, setItems] = useState<DocShotData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [nextLink, setNextLink] = useState<string>(next)
    const fetchNext = async() => {
        if (next) {
            try {
                setLoading(true)
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const url = nextLink.startsWith('/') ? `${hostV2}${nextLink}` : `${hostV2}/${nextLink}`
                const res = await fetch(url, { headers: headers })
                if (res.ok) {
                    const fetched = await res.json() as ChunkResponse<DocShotData[]>
                    setItems([...items, ...fetched.data])
                    setNextLink(fetched.next)
                }
            } catch(e) {
                setNextLink('')
            } finally {
                setLoading(false)
            }
        }
    }
    return (
        <>  
            { items && items.map( item => <ShotCard key={item.doc_id} shot={item} /> ) }
            <div className='flex items-center justify-center w-full py-2 col-span-full h-fit'>
                <Button disabled={!nextLink || loading} onClick={fetchNext}>
                    { loading && <BiLoaderAlt className='mr-1 animate-spin' /> } 
                    Загрузить ещё
                </Button>
            </div>
        </>
    )
}

export default Controller