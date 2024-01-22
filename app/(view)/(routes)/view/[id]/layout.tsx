import Footer from "@/components/shared/footer"
import Header from "@/components/widgets/header"


type Props = {
    children: JSX.Element
}
const layout = ({ children }: Props) => {
    return (
        <div className="w-full">
            <Header transparent={false} />
            { children }
            <Footer className="view-wrapper-paddings py-6" />
        </div>
    )
}

export default layout