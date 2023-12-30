import { ReactNode } from 'react'
import CategoryAndOrder from './CategoryAndOrder'
import Dock from '@/components/widgets/Dock/default'
import SearchBar from '@/components/widgets/SearchBar'
import Image from 'next/image'
// import gird from 'ui/assets/gird.svg'
import { ScrollSensetiveBox } from '@darkmaterial/ui/widgets'
import { ShotsGridWrapper } from '@darkmaterial/ui/shared'

type Props = {
    children: ReactNode
}
const ShotsLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col w-full h-full gap-12 snap-y snap-mandatory">
            <ScrollSensetiveBox>
                <div className="absolute top-0 left-0 z-[5] w-full h-full bg-gradient-to-t from-background via-transparent to-transparent" />
                <Image src={'gird'} fill className="object-cover -z-[1] opacity-30" alt="grid-layout" />
                <div className="relative z-10 w-full max-w-lg">
                    <div className="absolute z-[-1] w-full h-full bg-accent-foreground opacity-40 scale-110 blur-3xl" />
                    <SearchBar />
                </div>
            </ScrollSensetiveBox>
            <div className="flex flex-col w-full gap-4 pb-20 h-fit">
                <CategoryAndOrder />
                <ShotsGridWrapper>
                    {/* <Suspense fallback={<Loading />}> */}
                        { children }
                    {/* </Suspense> */}
                </ShotsGridWrapper>
            </div>
            <Dock />
        </div>
    )
}

export default ShotsLayout