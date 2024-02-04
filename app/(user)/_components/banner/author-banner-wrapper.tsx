
type Props = {
    children?: JSX.Element | JSX.Element[]
}
const AuthorBannerWrapper = ({ children }: Props) => {
    return (
        <div className="max-w-screen-2xl px-6 mx-auto flex flex-col my-12 relative">{children}</div>
    )
}

export default AuthorBannerWrapper