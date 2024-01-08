import { config } from "@/app.config"
import RemoteServerLogo from "@/components/shared/remote/remote-logo-server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BiChevronLeft } from "react-icons/bi"

const Header = () => {
    return (
        <header className="p-6 flex items-center gap-2 absolute top-0 left-0">
            <Button variant='ghost' asChild size='icon'><Link href='/shots/popular'><BiChevronLeft size={20} className='shrink-0' /></Link></Button>
            <RemoteServerLogo className='z-10' dark={config.remote.logo.dark} light={config.remote.logo.light} size={32} />
            <span className="text-lg font-bold">Frame</span>
        </header>
    )
}

export default Header