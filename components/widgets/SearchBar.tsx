'use client'
import { Input } from '@darkmaterial/ui/shadcn'
import { useDebounceEffect } from 'ahooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

type Props = {
    q?: string
    mini?: boolean
}
const SearchBar = ({ q, mini=false }: Props) => {
    const [query, setQuery] = useState<string>(q || '')
    const router = useRouter()
    useDebounceEffect(() => {
        if (query !== '') {
            const url = `/search/${query}`
            router.push(url)
        }
    }, [query, setQuery], { wait: 1000 })
    return (
        <div className={`flex items-center w-full ${ mini === false ? 'max-w-lg' : 'w-fit' } px-2.5 py-0.5 border rounded-xl bg-card`}>
            <BiSearch size={19} className='text-muted-foreground' />
            <Input value={query} className="text-center bg-inherit !border-0 !outline-none !rounded-none !ring-0" onChange={e => setQuery(e.target.value)} placeholder='Начните вводить для поиска' />
        </div>
    )
}

export default SearchBar