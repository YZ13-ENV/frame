import { bum } from "api"
import dynamic from "next/dynamic"
import { StarField } from "ui"
const ContainerScroll = dynamic(() => import("@/app/_components/dynamic-scroll-container"), {
    ssr: false
})
const InfiniteMovingCards = dynamic(() => import("@/app/_components/dynamic-moving-cards"), {
    ssr: false
})
const UserSection = dynamic(() => import("./widgets/header/ui/user-section"), {
    ssr: false,
    loading: () => <div className="w-fit h-fit flex items-center gap-2">
        <div className="w-9 aspect-square rounded-full bg-muted animate-pulse" />
        <div className="w-9 aspect-square rounded-full bg-muted animate-pulse" />
        <div className="w-9 aspect-square rounded-full bg-muted animate-pulse" />
        <div className="w-9 aspect-square rounded-full bg-muted animate-pulse" />
    </div>
})

const HeroSection = async () => {
    const shots = await bum.shots.all('popular')
    return (
        <div className="w-full min-h-[200dvh] flex flex-col items-center justify-start gap-4 relative">
            <div className="w-fit h-fit z-20 absolute p-6 right-0 top-0">
                <UserSection />
            </div>
            <StarField starsCount={100} />
            <ContainerScroll
                titleComponent={
                    <h1 className="!text-7xl font-bold text-center">
                        Вдохновляющие <br /> работы от дизайнеров
                    </h1>
                }
                data={shots.data}
            />
            <div className="w-full flex flex-col justify-center items-center">
                <InfiniteMovingCards
                    speed="slow"
                    pauseOnHover={false}
                    items={shots.data}
                    direction="left"
                />
                <InfiniteMovingCards
                    speed="slow"
                    pauseOnHover={false}
                    items={shots.data}
                    direction="right"
                />
            </div>
        </div>
    )
}

export default HeroSection
