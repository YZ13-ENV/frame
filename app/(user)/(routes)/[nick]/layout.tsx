import { file } from "@/api/file"
import FrameMark from "@/components/shared/frame-mark"
import User from "@/components/shared/user-circle"
import Image from "next/image"
import Link from "next/link"
import { ProjectsGrid } from "ui"

type Props = {
    children: JSX.Element | JSX.Element[]
}
const layout = async({ children }: Props) => {
    const grid = await file.static.get('gird.svg')
    return (
        <>
            { 
                grid && 
                <>
                    <div className='w-full h-full z-[-1] max-h-screen absolute top-0 left-0 bg-gradient-to-b from-transparent to-background' /> 
                    <Image src={grid} fill className='z-[-2] max-h-screen object-cover opacity-40' alt='grid' />
                </>
            }
            <div className="relative w-full h-fit flex top-0 left-0 items-center justify-end pt-6 px-6 z-20">
                <Link href='/shots/popular' className="w-fit h-fit md:mx-auto mr-auto flex items-center justify-center gap-3">
                    <FrameMark />
                    <span className="text-2xl font-semibold">Frame</span>
                </Link>
                <div className="absolute right-6 w-fit h-fit flex items-center gap-4 justify-end">
                    <ProjectsGrid />
                    <User />
                </div>
            </div>
            { children }
            <footer className="w-full h-fit p-6 border-t mt-24">
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