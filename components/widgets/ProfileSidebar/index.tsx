'use client'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiHome, BiStats } from 'react-icons/bi'
import { MdHistory, MdWork } from 'react-icons/md'
import { RiUser5Line } from 'react-icons/ri'
import { useAppSelector } from '@/components/entities/store/store'
import FollowButton from '../Dock/ui/FollowButton'
import { ShortUserData } from '@/types/user'
import { auth } from '@/utils/app'
import Avatar from '@/components/shared/avatar'

type Props = {
    author?: ShortUserData
    uid: string
}
const ProfileSidebar = ({ uid, author }: Props) => {
    const path = usePathname()
    const [user] = useAuthState(auth)
    const isSub = useAppSelector(state => state.user.isSubscriber)
    useLayoutEffect(() => {
        if (user) {
            if (user.displayName !== uid) {
                if (path.endsWith('/recommendations')) redirect(`/${uid}`)
                if (path.endsWith('/statistics')) redirect(`/${uid}`)
                if (path.endsWith('/history')) redirect(`/${uid}`)
            }
            if (!isSub) {
                if (path.endsWith('/recommendations')) redirect(`/${uid}`)
            }
        } else {
            if (path.endsWith('/recommendations')) redirect(`/${uid}`)
            if (path.endsWith('/statistics')) redirect(`/${uid}`)
            if (path.endsWith('/history')) redirect(`/${uid}`)
        }
    }, [user, uid, path])
    return (
        <div className="sticky flex flex-col h-full gap-4 pt-12 top-12 md:w-72 w-fit shrink-0">
            <Link href='/shots/popular' className="flex items-center justify-center w-full h-10 gap-1 md:w-fit text-muted-foreground">
                <BiHome size={19} className='mb-0.5 text-inherit' />
                <span className='hidden text-sm md:inline text-inherit'>На главную</span>
            </Link>
            {
                author &&
                <div className="flex flex-col items-center justify-between w-full gap-2 md:flex-row h-fit">
                    <div className="flex items-center w-full gap-2 md:w-1/2 h-fit">
                        <Avatar src={author.photoUrl} size={42} />
                        <div className="flex-col justify-center hidden w-full h-full md:flex">
                            <div className="flex items-center gap-1 w-fit h-fit">
                                <span className='font-medium line-clamp-1 text-accent-foreground'>{author.displayName || 'Пользователь'}</span>
                            </div>
                            <span className='text-xs line-clamp-1 text-muted-foreground'>{author?.email || ''}</span>
                        </div>
                    </div>
                    { user && (user.displayName !== uid) && <FollowButton author={uid} /> }
                </div>
            }
            <div className="flex flex-col w-full gap-2 h-fit">
                <SidebarLink active={(path.endsWith(uid) || path.endsWith(`${uid}/popular`) || path.endsWith(`${uid}/new`))} icon={<MdWork className='text-inherit' size={17} />} link={`/${uid}/`} title='Работы' />
                <SidebarLink active={path.endsWith('/bio')} icon={<RiUser5Line className='text-inherit' size={17} />} link={`/${uid}/bio`} title='Биография' />
                {
                    (user && user.displayName === uid) &&
                    <>
                        {
                            isSub &&
                            <>
                                {/* <SidebarLink beta active={path.endsWith('/recommendations')} icon={<BsStars className='text-inherit' size={17} />} link={`/${uid}/recommendations`} title='Рекомендации' /> */}
                            </>
                        }
                        <SidebarLink active={path.endsWith('/statistics')} icon={<BiStats className='text-inherit' size={17} />} link={`/${uid}/statistics`} title='Статистика' />
                        <SidebarLink active={path.endsWith('/history')} icon={<MdHistory className='text-inherit' size={17} />} link={`/${uid}/history`} title='История' />
                    </>
                }
            </div>
        </div>
    )
}

type LinkProps = {
    link: string
    title: string
    icon: React.ReactNode
    active?: boolean
    beta?: boolean
}
const SidebarLink = ({ icon, link, title, active=false, beta=false }: LinkProps) => {
    return (
        <Link href={link} className={`flex items-center h-10 gap-2 px-3 rounded-lg W-full duration-500 transition-colors ${active ? 'text-primary-foreground bg-primary' : 'text-accent-foreground hover:text-card hover:bg-card-foreground bg-card'}`}>
            { icon }
            <span className="hidden md:inline text-inherit">{title} { beta && <sup>Beta</sup>}</span>
        </Link>
    )
}

export default ProfileSidebar