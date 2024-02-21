import Footer from "@/components/shared/footer"
import Header from "@/components/widgets/header"
import { bum } from "api"
import { Metadata, ResolvingMetadata } from "next"


type Props = {
    children: JSX.Element
    params: {
        id: string
    }
}
export async function generateMetadata({ params }: { params: { id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
    const { id } = params
    const shot = id ? await bum.shot.get(id) : null
    if (shot) {
        return {
            title: shot.title
        }
    } else return {
        title: 'Не найдено'
    }
}
const layout = ({ children }: Props) => {
    return (
        <>
            <Header transparent />
            {children}
            <Footer className="view-wrapper-paddings py-6" />
        </>
    )
}

export default layout