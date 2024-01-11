import { file } from "@/api/file"
import FrameMark from "@/components/shared/frame-mark"
import Header from "@/components/widgets/header"
import Image from "next/image"

type Props = {
    children: JSX.Element | JSX.Element[]
}
const layout = async({ children }: Props) => {
    const grid = await file.static.get('gird.svg')
    return (
        <>
            <Header />
            <div className="min-h-screen w-full relative py-12 lg:px-24 md:px-12 px-6">
                { 
                    grid && 
                    <>
                        <div className='w-full h-full z-[-1] max-h-screen absolute top-0 left-0 bg-gradient-to-b from-transparent to-background' /> 
                        <Image src={grid} fill className='z-[-2] max-h-screen object-cover opacity-40' alt='grid' />
                    </>
                }

                { children }
            </div>
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