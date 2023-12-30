'use client'
import { Button } from '@darkmaterial/ui/shadcn'
import { hostV2 } from '@darkmaterial/core/const'
import { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import TagCard from './TagCard'
import { authorizationHeader } from '@darkmaterial/api/helpers'
import type { ChunkResponse } from '@darkmaterial/core/types'
// import { motion } from 'framer-motion'

type Props = {
    next: string
}
function Controller({ next }: Props) {
    const [items, setItems] = useState<string[]>([])
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
                    const fetched = await res.json() as ChunkResponse<string[]>
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
            { items && items.map((item, index) => <TagCard key={item} tag={item} /> ) }
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