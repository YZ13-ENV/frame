'use client'

import { auth } from "@darkmaterial/core/utils"
import { useAuthState } from "react-firebase-hooks/auth"
import { useLayoutEffect, useState } from 'react'
import { bumAPI } from '@darkmaterial/api'
import { notification } from '@darkmaterial/api/helpers'
import { BiLoaderAlt, BiUser, BiUserCircle, BiUserPlus } from "react-icons/bi"
import { Button } from "@darkmaterial/ui/shadcn"
import { DateTime } from 'luxon'

type Props = {
    author: string | null
}
const FollowButton = ({ author }: Props) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const [isFollowed, setFollowed] = useState<boolean>(false)
    const check = async() => {
        if (user) {
            const isInList = await bumAPI.isFollowed(user.uid, author)
            setFollowed(isInList)
        }
    }
    const startFollowing = async() => {
        if (user) {
            setLoading(true)
            await bumAPI.follow(user.uid, author)
            notification.create({
                title: 'У вас новый подписчик',
                description: `На вас подписался "${user.displayName}"`,
                createdAt: DateTime.now().toSeconds(),
                isViewed: false,
                receiver: author
            })
            check()
            setLoading(false)
        }
    }
    const stopFollowing = async() => {
        if (user) {
            setLoading(true)
            await bumAPI.unFollow(user.uid, author)
            check()
            setLoading(false)
        }  
    }
    useLayoutEffect(() => {
        check()
    },[user])
    if (user && (user.uid === author)) {
        return <Button variant="ghost" size='default' className="gap-2 shrink-0 rounded-xl">
            <BiUserCircle size={20} className="text-inherit shrink-0" />
            <span className="hidden gap-2 text-sm font-medium shrink-0 md:inline text-inherit">Это вы</span>
        </Button>
    }
    if (isFollowed) {
        return (
            <Button onClick={stopFollowing} size='default' variant="outline" className="rounded-xl">
                { loading && <BiLoaderAlt size={24} className="animate-spin text-inherit" /> }
                <span className='hidden font-medium md:inline text-inherit'>Вы подписаны</span>
                { !loading && <BiUser size={17} className='inline md:hidden'  /> }
            </Button>
        )
    }
    return (
        <Button onClick={startFollowing} size='default' className="rounded-xl">
            { loading && <BiLoaderAlt size={24} className="animate-spin text-inherit" /> }
            <span className='hidden font-medium md:inline text-inherit'>Подписаться</span>
            { !loading && <BiUserPlus size={17} className='inline md:hidden'  /> }
        </Button>
    )
}

export default FollowButton