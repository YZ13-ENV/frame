import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
const NavSection = dynamic(() => import("./ui/nav-section"))
const UserSection = dynamic(() => import("./ui/user-section"))

type Props = {
    transparent?: boolean
}
const Header = ({ transparent=true }: Props) => {
    return (
        <header className={cn(
            transparent ? 'bg-transparent' : 'bg-card',
            'relative w-full h-fit py-1 shrink-0 flex top-0 left-0 items-center justify-end px-6 z-20'
        )}>
            <NavSection />
            <UserSection />
        </header>
    )
}

export default Header