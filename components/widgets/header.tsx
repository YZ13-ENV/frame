import Link from "next/link"
import FrameMark from "../shared/frame-mark"
import { ProjectsGrid } from "ui"
import User from "../shared/user-circle"
import DMMark from "../shared/dm-mark"
import { Separator } from "../ui/separator"
import FrameTitle from "../shared/frame-title"
import Notifications from "./notifications"
import { cookies } from 'next/headers'
import { BiSearch } from 'react-icons/bi'

type Props = {
    transparent?: boolean
}
const Header = ({ transparent=true }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const visitorId = uidCookie ? uidCookie.value : null
    const preferredSortingCookie = cookiesList.get('sorting')
    const preferredSorting = preferredSortingCookie ? preferredSortingCookie.value : null
    const home_link = preferredSorting ? `/shots/${preferredSorting}` : visitorId ? '/shots/following' : '/shots/popular'
    return (
        <header className={`relative w-full h-16 shrink-0 flex top-0 left-0 items-center justify-end py-2 ${transparent ? '' : 'bg-card'} px-6 z-20`}>
            <div className="w-fit h-fit mr-auto flex items-center justify-center gap-3">
                <Link href='https://darkmaterial.space'>
                    <DMMark />
                </Link>
                <Separator orientation="vertical" className="h-9 mx-1" />
                <Link href={home_link}>
                    <FrameMark />
                </Link>
                <FrameTitle />
            </div>
            <div className="absolute right-6 w-fit h-fit flex items-center gap-4 justify-end">
                <Link href='/search' className='w-9 h-9 rounded-full border flex items-center justify-center'><BiSearch /></Link>
                <Notifications />
                <ProjectsGrid />
                <User />
            </div>
        </header>
    )
}

export default Header