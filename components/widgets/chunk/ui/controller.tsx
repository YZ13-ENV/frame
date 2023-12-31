'use client'
import ShotCard from '@/components/shared/shot-card'
import { Button } from '@/components/ui/button'
import { api_host } from '@/const/host'
import { authorizationHeader } from '@/helpers/headers'
import { ChunkResponse } from '@/types/common'
import { DocShotData } from '@/types/shot'
import { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

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
                const url = nextLink.startsWith('/') ? `${api_host}${nextLink}` : `${api_host}/${nextLink}`
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
                <Button disabled={!nextLink || loading} onClick={fetchNext} variant={!nextLink ? 'outline' : 'default'}>
                    { loading && <BiLoaderAlt className='mr-1 animate-spin' /> } 
                    { nextLink ? 'Загрузить ещё' : 'Вы дошли до конца списка' }
                </Button>
            </div>
        </>
    )
}

export default Controller