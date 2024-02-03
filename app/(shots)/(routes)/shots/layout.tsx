import { Suspense } from "react"
import dynamic from "next/dynamic"
import Nav from "../../_components/nav"
import Footer from "@/components/shared/footer"
import HeaderSkeleton from "@/components/skeletons/header"
const Header = dynamic(() => import( "@/components/widgets/header"), {
    loading: () => <HeaderSkeleton />
})

type Props = {
    children: JSX.Element | JSX.Element[]
}
const layout = async({ children }: Props) => {
    return (
        <>
            <Suspense fallback={<HeaderSkeleton />}>
                <Header />
            </Suspense>
            <div className="w-full h-fit px-6 py-2 flex items-center justify-center border-b">
                <Nav padding={false} />
            </div>
            <div className="min-h-screen w-full relative py-12 lg:px-24 md:px-12 px-6">
                <div className="w-full h-full z-20 grid shots_grid gap-6">
                    { children }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default layout