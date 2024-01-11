import { file } from "@/api/file"
import FrameMark from "@/components/shared/frame-mark"
import User from "@/components/shared/user-circle"
import Image from "next/image"
import Link from "next/link"
import { ProjectsGrid } from "ui"
import PortfolioNav from "../../_components/nav"
import AuthorBanner from "../../_components/author-banner"
import { cookies } from "next/headers"
import { user } from "@/api/user"
import { bum } from "@/api/bum"

type Props = {
    children: JSX.Element | JSX.Element[]
    params: {
        nick: string
    }
}
const layout = async({ children, params }: Props) => {
    const grid = await file.static.get('gird.svg')
    const nick = params.nick
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const byId = user.byId.short(nick)
    const byNickname = user.byNick.short(nick)
    const [dataById, dataByNickname] = await Promise.all([byId, byNickname])
    const author = dataByNickname ? dataByNickname : dataById 
    const popular = author ? await bum.shot.getPopularOne(author.uid) : null
    const isNickname = author ? nick === author.nickname : false
    const path = isNickname && author ? `/${author.nickname}` : `/${nick}`
    return (
        <>
            { 
                grid && 
                <>
                    <div className='w-full h-full z-[-1] max-h-screen absolute top-0 left-0 bg-gradient-to-b from-transparent to-background' /> 
                    <Image src={grid} fill className='z-[-2] max-h-screen object-cover opacity-40' alt='grid' />
                </>
            }
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
            {
                author &&
                <AuthorBanner author={author} authorId={author.uid} popularShot={popular} visitorId={uid || ''} />
            }
            <div className="w-full px-6 my-6 mx-auto max-w-screen-2xl">
                <PortfolioNav path={path} />
            </div>
            { children }
            <footer className="w-full h-fit p-6 border-t bg-card max-w-screen-2xl mx-auto border-x">
                <div className="max-w-7xl mx-auto w-full h-full flex gap-4 items-center justify-center">
                    <span className="text-2xl font-semibold">2024</span>
                    <FrameMark />
                    <span className="text-2xl font-semibold">Frame</span>
                </div>
            </footer>
        </>
    )
}

export default layout