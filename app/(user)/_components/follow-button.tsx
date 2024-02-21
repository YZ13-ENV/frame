'use client'
import { bum } from 'api'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {
    from: string
    to: string
    defaultValue?: boolean
}
const FollowButton = ({ from, to, defaultValue = false }: Props) => {
    const isYou = from === to
    const disabled = !from || !to || from === to
    const [loading, setLoading] = useState<boolean>(false)
    const [followed, setIsFollowed] = useState<boolean>(defaultValue)
    const action = async (from: string, to: string) => {
        setLoading(true)
        const followers = await bum.author.follow(from, to)
        const isNowFollowed = followers.includes(to)
        setIsFollowed(isNowFollowed)
        setLoading(false)
    }
    if (isYou) return <Button disabled variant='outline'>Это вы</Button>
    return (
        <Button disabled={disabled} onClick={() => action(from, to)} variant={followed ? 'outline' : 'default'} className='gap-2'>
            {loading && <BiLoaderAlt className='animate-spin' />}
            {followed ? 'Вы подписаны' : 'Подписаться'}
        </Button>
    )
}

export default FollowButton