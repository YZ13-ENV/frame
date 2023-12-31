

type Props = {
    children?: JSX.Element | JSX.Element[]
    searchParams: {
        id: string
    }
}
const layout = ({ searchParams, children }: Props) => {
    return (
        <div className="w-full">
            { children }
        </div>
    )
}

export default layout