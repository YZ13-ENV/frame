import dynamic from "next/dynamic"
const NavSection = dynamic(() => import("./ui/nav-section"))
const UserSection = dynamic(() => import("./ui/user-section"))

type Props = {
    transparent?: boolean
}
const Header = ({ transparent=true }: Props) => {
    return (
        <header className={`relative w-full h-fit py-1 shrink-0 flex top-0 left-0 items-center justify-end ${transparent ? '' : 'bg-card'} px-6 z-20`}>
            <NavSection />
            <UserSection />
        </header>
    )
}

export default Header