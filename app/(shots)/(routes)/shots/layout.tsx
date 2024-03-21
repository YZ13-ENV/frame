import SearchBox from "@/app/_components/search-box"
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
            <div className="mt-10" />
            <div className="w-full px-6 mx-auto flex flex-col items-center justify-center gap-4 max-w-4xl py-12">
                <h1 className="text-center">Добро пожаловать во Frame</h1>
                <span className="lg:text-xl text-lg text-center text-muted-foreground">
                    Изучите тысячи шаблонов и наборов пользовательского интерфейса,
                    чтобы начать реализацию следующей большой идеи
                </span>
            </div>
            <div className="w-full px-6">
                <SearchBox />
            </div>
            <ShotsWrapper>
                <div className="w-full h-fit py-2 flex items-center justify-center">
                    <Nav padding={false} onlyOrder />
                </div>
                <div className="w-full h-full z-20 grid shots_grid gap-6">
                    {children}
                </div>
            </ShotsWrapper>
            <Footer className="lg:px-24 md:px-12 px-6 py-6" />
        </>
    )
}

export default layout