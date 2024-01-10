
type Props = {
    children: JSX.Element | JSX.Element[]
}
const AuthorBannerWrapper = ({ children }: Props) => {
    return (
        <div className="author-banner">{children}</div>
    )
}

export default AuthorBannerWrapper