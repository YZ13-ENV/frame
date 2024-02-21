import { cn } from "@/lib/utils"

type Props = {
    transparent?: boolean
    children: JSX.Element | JSX.Element[] | undefined
}
const AuthorBannerWrapper = ({ children, transparent = false }: Props) => {
    return (
        <div className={cn(
            transparent ? 'bg-transparent' : 'bg-card',
            "flex flex-col py-12 relative"
        )}>
            <div className="max-w-screen-2xl w-full px-6 mx-auto">{children}</div>
        </div>
    )
}

export default AuthorBannerWrapper