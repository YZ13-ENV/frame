import { Button } from "@/components/ui/button"
import { cdn } from "@/helpers/cdn"
import Image from "next/image"
import Link from "next/link"
import { BiChevronLeft } from "react-icons/bi"

const Header = () => {
    return (
        <header className="p-6 flex items-center gap-2 absolute top-0 left-0">
            <Button variant='ghost' asChild size='icon'><Link href='/shots/popular'><BiChevronLeft size={20} className='shrink-0' /></Link></Button>
            <Image className='z-10' src={cdn('dm/icons/frame-dark.svg')} width={32} height={32} alt="frame-logo" />
            <span className="text-lg font-bold">Frame</span>
        </header>
    )
}

export default Header