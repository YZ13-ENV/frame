import Footer from "@/components/shared/footer"
import HeaderSkeleton from "@/components/skeletons/header"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import Nav from "../../_components/nav"
import ShotsWrapper from "../../_components/shots-wrapper"
const Header = dynamic(() => import("@/components/widgets/header"), {
    loading: () => <HeaderSkeleton />
})

type Props = {
    children: JSX.Element | JSX.Element[]
}
const layout = async ({ children }: Props) => {
    return (
        <>
            <Suspense fallback={<HeaderSkeleton />}>
                <Header />
            </Suspense>
            <div style={{ height: "calc(100dvh - 56px)" }} className="w-fill relative flex">
                <div className="w-full h-full overflow-y-auto">
                    <div className="w-full h-fit px-6 py-2 flex items-center justify-center">
                        <Nav padding={false} />
                    </div>
                    <ShotsWrapper>
                        <div className="w-full h-full z-20 grid shots_grid gap-6">
                            {children}
                        </div>
                    </ShotsWrapper>
                    <Footer className="lg:px-24 md:px-12 px-6 py-6" />
                </div>
            </div>
        </>
    )
}

export default layout