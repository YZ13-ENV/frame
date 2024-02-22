import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { ReactNode } from "react"
const NavSection = dynamic(() => import("./ui/nav-section"))
const UserSection = dynamic(() => import("./ui/user-section"), {
    ssr: false
})

type Props = {
    menu?: ReactNode
    transparent?: boolean
}
const Header = ({ menu, transparent = true }: Props) => {
    return (
        <header className={cn(
            transparent ? 'bg-transparent' : 'bg-card',
            'relative w-full h-14 py-1 shrink-0 flex top-0 left-0 items-center justify-end px-6 z-20'
        )}>
            <NavSection menu={menu} />
            <UserSection />
        </header>
    )
}

export default Header