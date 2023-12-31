'use client'

import { useLayoutEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiMenu, BiUser } from 'react-icons/bi'
import { MdOpenInNew } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import { BsPatchCheck } from 'react-icons/bs'
import { useCookieState, useLocalStorageState } from 'ahooks'
import { auth } from '@/utils/app'
import { useAppSelector } from '@/components/entities/store/store'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Avatar from '@/components/shared/avatar'

type Props = {
    signLink?: string
    profileLink?: string
    haveDashboard?: boolean
}
const MobileMenu = ({ haveDashboard=false, profileLink, signLink }: Props) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 786px)' })
    const [open, setOpen] = useState<boolean>(false)
    const [user, loading] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const [sid, setSID] = useLocalStorageState<string | null>( 'sid', { defaultValue: null } );
    const [cookie, setCookie] = useCookieState('uid')
    const getSignOut = async() => {
        await auth.signOut()
    }
    useLayoutEffect(() => {
        if (user) {
            if (!cookie) {
                auth.signOut()
            } else if (!cookie && user) {
                setCookie(user.uid)
            }
        }
    },[cookie, user])
    if (!isTabletOrMobile) return null
    return (
        <Dialog open={open} onOpenChange={state => setOpen(state)}>
            <DialogTrigger asChild>
                <div>
                    {
                        loading
                        ? <div className="border rounded-full shrink-0 animate-pulse w-9 h-9 bg-card"/>
                        : !user
                        ? <Link href={signLink || '/auth/signin'}><Button><BiUser className='mr-1' size={15} />Войти</Button></Link>
                        : <button className='flex items-center justify-center gap-2 p-2 border rounded-full bg-card'>
                            <BiMenu size={19} className='text-accent-foreground' />
                        </button>
                    }
                </div>
            </DialogTrigger>
            <DialogContent className='h-full gap-4'>
                <div className="flex flex-col w-full gap-4 h-fit">
                    <div className="flex flex-col w-full h-fit">
                        <Link href='/redirect/app/darkmaterial.space?path=/profile' 
                        className="flex items-center justify-between w-full py-3 border-b h-fit">
                            <div className="flex flex-col justify-center w-fit h-fit">
                                <span className='font-medium text-accent-foreground'>{user?.displayName || 'Пользователь'}</span>
                                <span className='text-sm text-muted-foreground'>{user?.email}</span>
                            </div>
                            <Avatar src={user?.photoURL || null} size={36} isSubscriber={isSub} />
                        </Link>
                        {
                            haveDashboard &&
                            <div className="flex items-center justify-between w-full py-3 border-b h-fit">
                                <span className='text-muted-foreground'>Доска</span>
                            </div>
                        }
                        {/* <div className="flex flex-col w-full gap-2 py-3 border-b h-fit">
                            <span className='text-lg font-medium'>Сессия</span>
                            <div className="flex flex-col w-full gap-2 h-fit">
                                <SessionMembersList size='default' />
                            </div>
                        </div> */}
                    </div>
                    <div className="flex flex-col w-full gap-2 h-fit">
                        <span className='text-lg font-medium'>Ресурсы</span>
                        <div className="flex flex-col w-full h-fit">
                            <div className="flex items-center justify-between w-full py-3 border-b h-fit">
                                <span className='text-muted-foreground'>О проекте</span>
                            </div>
                            <Link href='/redirect/app/darkmaterial.space?path=/home' 
                            className="flex items-center justify-between w-full py-3 border-b h-fit text-muted-foreground">
                                <span>DarkMaterial Home</span>
                                <MdOpenInNew size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2 mt-auto h-fit">
                    <div className="flex flex-col w-full h-fit">
                        <button onClick={getSignOut} className="flex items-center justify-between w-full py-3 border-b h-fit">
                            <span className='text-muted-foreground'>Выйти из профиля</span>
                        </button>
                    </div>
                    {
                        isSub
                        ? <Button variant='ghost'>Вы в плюсе</Button>
                        : <Button className='gap-2'><BsPatchCheck size={18} className='text-inherit' />Улучшить до Плюс</Button>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export { MobileMenu }