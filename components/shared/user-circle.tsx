'use client'
import { MenuMapProps, UserCircle } from 'ui'
import type { User } from 'firebase/auth'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import { user as userAPI } from 'api'
import { menu } from '@/const/menu-map'
import dynamic from 'next/dynamic'
import { auth } from '@/utils/app'
import { useSession } from 'hooks'
const OneClickAuth = dynamic(() => import('../widgets/one-click-auth'), {
    ssr: false
})

type Props = {
    size?: number
}
const User = ({ size = 36 }: Props) => {
    const [session, controls, user] = useSession(auth)
    const [isSubscriber, setIsSubscriber] = useState<boolean>(false)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 786px)' })
    const link = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://frame.darkmaterial.space'
    const signOut = async () => controls('update', user?.uid || '')
    const menuWithSignOut: MenuMapProps = [
        ...menu,
        {
            type: 'wrapper',
            className: 'h-fit w-full mt-auto',
            items: [
                {
                    type: 'sign-out',
                    action: signOut
                },
                {
                    type: 'membership',
                    activeState: isSubscriber ? 'active' : 'inactive',
                    state: {
                        active: 'Вы в плюсе',
                        inactive: 'Получите плюс'
                    }
                }
            ]
        }
    ]
    useEffect(() => {
        if (user) userAPI.byId.short(user.uid)
            .then(data => setIsSubscriber(data ? data.isSubscriber : false))
    }, [user])
    return (
        <>
            {session && !session.activeUid && <OneClickAuth members={session.members} user={user} onUser={uid => controls('update', uid)} />}
            <UserCircle size={size} isSubscriber={isSubscriber} map={menuWithSignOut} loginLink={link}
                activeMenu={isTabletOrMobile ? 'mobile' : 'desktop'} user={user as User | undefined} buttonSize='lg' />
        </>
    )
}

export default User