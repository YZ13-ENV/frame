
type Props = {
    children: JSX.Element | JSX.Element[]
}
const AuthorBannerWrapper = ({ children }: Props) => {
    return (
        <div className="w-full md:h-[60vh] h-fit pt-16">{children}</div>
    )
}

export default AuthorBannerWrapper