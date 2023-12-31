

type Props = {
    children: JSX.Element
}
const layout = ({ children }: Props) => {
    return (
        <div className="w-full">
            { children }
        </div>
    )
}

export default layout