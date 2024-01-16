'use client'
import { UserCircle } from 'ui'
import type { User } from 'firebase/auth'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import { user as userAPI } from '@/api/user'
import { menu } from '@/const/menu-map'
import { useSession } from '@/hooks/useSession'

type Props = {
    size?: number
}
const User = ({ size=36 }: Props) => {
    const [session, controls, user] = useSession()
    const [isSubscriber, setIsSubscriber] = useState<boolean>(false)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 786px)' })
    useEffect(() => {
        if (user) userAPI.byId.short(user.uid)
        .then(data => setIsSubscriber(data ? data.isSubscriber : false))
    },[user])
    return (
        <UserCircle size={size} isSubscriber={isSubscriber} map={menu}
        activeMenu={isTabletOrMobile ? 'mobile' : 'desktop'} user={user as User | undefined} buttonSize='lg' />
    )
}

export default User