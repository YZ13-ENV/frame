import Header from "@/components/widgets/header"


type Props = {
    children: JSX.Element
}
const layout = ({ children }: Props) => {
    return (
        <div className="w-full">
            <Header mini transparent={false} />
            { children }
            <footer className="w-full border-b h-16"></footer>
        </div>
    )
}

export default layout