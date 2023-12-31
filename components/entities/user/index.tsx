'use client'
import { useAuthState } from "react-firebase-hooks/auth"
import { BiUser } from "react-icons/bi"
import { MdOutlineOpenInNew } from 'react-icons/md'
import Link from "next/link"
import { useLayoutEffect } from 'react'
import { useCookieState } from 'ahooks'
import UserPart from "./ui/UserPart"
import UpgradeButton from "./ui/UpgradeButton"
import Logout from "./ui/Logout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Avatar from "@/components/shared/avatar"
import { auth } from "@/utils/app"
import { useAppSelector } from "../store/store"


type Props = {
    signLink?: string
    profileLink?: string
    haveDashboard?: boolean
    size?: number
}
const UserSection = ({ signLink, haveDashboard, profileLink, size=36 }: Props) => {
    const [user, loading] = useAuthState(auth)
    const [cookie, setCookie] = useCookieState('uid')
    const isSub = useAppSelector(state => state.user.isSubscriber)
    const signInLink = signLink || '/auth/signin'
    useLayoutEffect(() => {
        if (user) {
            if (!cookie) {
                auth.signOut()
            } else {
                setCookie(user.uid)
            }
        }
    },[cookie, user])
    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={loading || !user} asChild>
                <div>
                    {
                        loading
                        ? <div style={{ width: `${size}px`, height: `${size}px` }} className="rounded-full shrink-0 animate-pulse w-9 h-9 bg-muted"/>
                        : !user
                        ? <Link href={signInLink}><Button><BiUser className='mr-1' size={15} />Войти</Button></Link>
                        : <Avatar size={size} isSubscriber={isSub || false} src={user?.photoURL} />
                    }
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 w-60 rounded-xl">
                { user && <UserPart user={user} /> }
                <DropdownMenuSeparator />
                {
                    haveDashboard &&
                    <Link href='/dashboard'><DropdownMenuItem>Доска</DropdownMenuItem></Link>
                }
                <DropdownMenuItem asChild>
                    <Link href='https://darkmaterial.space/settings'>Настройки</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <Link href='https://darkmaterial.space/home'><span>DarkMaterial Home</span><MdOutlineOpenInNew className='ml-auto' /></Link>
                </DropdownMenuItem>
                <Logout />
                <DropdownMenuSeparator/>
                <UpgradeButton isSubscriber={isSub} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { UserSection }