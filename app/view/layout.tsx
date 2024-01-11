import Header from "@/components/widgets/header"


type Props = {
    children: JSX.Element
}
const layout = ({ children }: Props) => {
    return (
        <div className="w-full">
            <Header />
            { children }
        </div>
    )
}

export default layout