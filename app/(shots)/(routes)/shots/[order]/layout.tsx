import Nav from "@/app/(shots)/_components/nav"

type Props = {
    children: JSX.Element | JSX.Element[]
}
const layout = ({ children }: Props) => {
    return (
        <>
            {/* <div className="w-full h-[20vh]"></div> */}
            <Nav />
            { children }
        </>
    )
}

export default layout