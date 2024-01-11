import Link from "next/link"
import FrameMark from "../shared/frame-mark"
import { ProjectsGrid } from "ui"
import User from "../shared/user-circle"

const Header = () => {
    return (
        <header className="relative w-full h-fit flex top-0 left-0 items-center justify-end pt-6 px-6 z-20">
            <Link href='/shots/popular' className="w-fit h-fit md:mx-auto mr-auto flex items-center justify-center gap-3">
                <FrameMark />
                <span className="text-2xl font-semibold">Frame</span>
            </Link>
            <div className="absolute right-6 w-fit h-fit flex items-center gap-4 justify-end">
                <ProjectsGrid />
                <User />
            </div>
        </header>
    )
}

export default Header