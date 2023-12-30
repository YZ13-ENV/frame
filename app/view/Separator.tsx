'use client'
import { Avatar } from '@darkmaterial/ui/shared'
import type { SeparatorProps, ShortUserData } from '@darkmaterial/core/types'
import { useEffect, useState } from 'react'
import { userAPI } from '@darkmaterial/api'

type Props = {
    block: SeparatorProps
}
const Separator = ({ block }: Props) => {
    const [userData, setUserData] = useState<ShortUserData | null>(null)
    useEffect(() => {
        if (block.uid !== '') userAPI.byId.short(block.uid)
        .then(data => setUserData(data))
    },[block.uid])
    return (
        <div className='flex items-center justify-center w-full gap-2 h-fit'>
            <hr className='w-full border-neutral-700' />
            { 
                userData && <Avatar src={userData.photoUrl} size={36} isSub={userData.isSubscriber} /> 
            }
            <hr className='w-full border-neutral-700' />
        </div>
    )
}

export default Separator