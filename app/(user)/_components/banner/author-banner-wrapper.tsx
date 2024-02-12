import { cn } from "@/lib/utils"

type Props = {
    transparent?: boolean
    children: JSX.Element | JSX.Element[] | undefined
}
const AuthorBannerWrapper = ({ children, transparent=false }: Props) => {
    return (
        <div className={cn(
            transparent ? 'bg-transparent' : 'bg-card',
            "max-w-screen-2xl px-6 mx-auto flex flex-col py-12 relative"
        )}>{children}</div>
    )
}

export default AuthorBannerWrapper