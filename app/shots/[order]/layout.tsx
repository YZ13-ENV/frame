
type Props = {
    children?: JSX.Element | JSX.Element[]
}
const layout = ({ children }: Props) => {
    return (
        <>
            <div className="w-full h-[20vh]"></div>
            <div className="w-full py-6 flex items-center justify-between">
                <div className="w-24 h-8 rounded-lg bg-muted" />
                <div className="w-1/2 h-8 rounded-lg bg-muted" />
                <div className="w-24 h-8 rounded-lg bg-muted" />
            </div>
            { children }
        </>
    )
}

export default layout