import Footer from "@/components/shared/footer"
import HeaderSkeleton from "@/components/skeletons/header"
import dynamic from "next/dynamic"
import { Suspense } from "react"
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
            {/* <div style={{ height: "calc(100dvh - 56px)" }} className="w-fill relative flex flex-col"> */}
            {/*
                    <div className="w-full h-fit px-6 py-2 flex items-center justify-center">
                        <Nav padding={false} />
                    </div>
                    */}
            <div className="w-full px-6 mx-auto flex flex-col items-center justify-center gap-4 max-w-4xl py-12">
                <h1 className="text-center">Добро пожаловать во Frame</h1>
                <span className="lg:text-xl text-lg text-center text-muted-foreground">
                    Изучите тысячи шаблонов и наборов пользовательского интерфейса,
                    чтобы начать реализацию следующей большой идеи
                </span>
            </div>
            <div className="w-full px-6">
                <div className="max-w-xl w-full mx-auto h-fit rounded-2xl bg-card p-3 flex flex-col gap-2 border">
                    <div className="w-full h-9 rounded-lg bg-muted"></div>
                    <div className="w-full h-9 flex items-center justify-between gap-2">
                        <div className="w-1/6 h-full rounded-lg bg-muted"></div>
                        <div className="w-1/6 h-full rounded-lg bg-muted"></div>
                        <div className="w-1/6 h-full rounded-lg bg-muted"></div>
                        <div className="w-1/6 h-full rounded-lg bg-muted"></div>
                        <div className="w-1/6 h-full rounded-lg bg-muted"></div>
                        <div className="w-1/6 h-full rounded-lg bg-muted"></div>
                    </div>
                </div>
            </div>
            <ShotsWrapper>
                <div className="w-full h-full z-20 grid shots_grid gap-6">
                    {children}
                </div>
            </ShotsWrapper>
            <Footer className="lg:px-24 md:px-12 px-6 py-6" />
            {/* </div> */}
        </>
    )
}

export default layout