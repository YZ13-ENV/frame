'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { bum } from "@darkmaterial/api"
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
    if (isYou) return <Button className="rounded-full gap-2" disabled variant='secondary'>Это вы</Button>
    return (
        <Button
            disabled={disabled}
            onClick={() => action(from, to)}
            variant={followed ? "secondary" : "default"}
            className={cn(
                followed ? "" : "bg-primary/75 backdrop-blur-sm",
                "rounded-full gap-2"
            )}>
            {loading && <BiLoaderAlt className='animate-spin' />}
            {followed ? 'Вы подписаны' : 'Подписаться'}
        </Button>
    )
}

export default FollowButton