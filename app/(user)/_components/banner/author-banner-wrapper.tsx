
type Props = {
    children: JSX.Element | JSX.Element[]
}
const AuthorBannerWrapper = ({ children }: Props) => {
    return (
        <div className="author-banner relative">{children}</div>
    )
}

export default AuthorBannerWrapper