import { Suspense } from "react"
import dynamic from "next/dynamic"
import HeaderSkeleton from "@/components/skeletons/header"
import Nav from "../../_components/nav"
import Footer from "@/components/shared/footer"
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
            <div className="min-h-screen w-full relative py-12 lg:px-24 md:px-12 px-6">
                <Nav />
                <div className="w-full h-full z-20 grid shots_grid gap-6">
                    { children }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default layout