import Link from "next/link"
import FrameMark from "../shared/frame-mark"
import { ProjectsGrid } from "ui"
import User from "../shared/user-circle"
import DMMark from "../shared/dm-mark"
import { Separator } from "../ui/separator"
import FrameTitle from "../shared/frame-title"
import Notifications from "./notifications"

type Props = {
    transparent?: boolean
}
const Header = ({ transparent=true }: Props) => {
    return (
        <header className={`relative w-full h-fit flex top-0 left-0 items-center justify-end py-2 ${transparent ? '' : 'bg-card'} px-6 z-20`}>
            <div className="w-fit h-fit md:mx-auto mr-auto flex items-center justify-center gap-3">
                <Link href='https://darkmaterial.space'>
                    <DMMark />
                </Link>
                <Separator orientation="vertical" className="h-9 mx-1" />
                <Link href='/shots/popular'>
                    <FrameMark />
                </Link>
                <FrameTitle />
            </div>
            <div className="absolute right-6 w-fit h-fit flex items-center gap-4 justify-end">
                {/* <Notifications /> */}
                <ProjectsGrid />
                <User />
            </div>
        </header>
    )
}

export default Header