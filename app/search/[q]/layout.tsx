import CategoryAndOrder from '@/app/shots/CategoryAndOrder'
import SearchDock from '@/components/widgets/Dock/search'
import { ReactNode } from 'react'
import Image from 'next/image'
// import gird from 'ui/assets/gird.svg'
import { ScrollSensetiveBox } from '@darkmaterial/ui/widgets'
import { ShotsGridWrapper } from '@darkmaterial/ui/shared'
// import Loading from '@/components/shared/Loading'


type Props = {
    params: {
        q: string
    },
    children: ReactNode
}
const SearchLayout = ({ params, children }: Props) => {
    return (
        <div className="flex flex-col w-full h-full gap-12 pb-16">
            <ScrollSensetiveBox>
                <div className="relative flex items-center justify-center w-full h-full max-w-lg mx-auto">
                    <span className='text-4xl font-medium text-center text-accent-foreground md:text-6xl'>{ params.q }</span>
                </div>
                <div className="absolute top-0 left-0 z-[5] w-full h-full bg-gradient-to-t from-background via-transparent to-transparent" />
                <Image src={'gird'} fill className="object-cover -z-[1] opacity-30" alt="grid-layout" />
            </ScrollSensetiveBox>
            <div className="flex flex-col w-full gap-4 h-fit">
                <CategoryAndOrder noCategory />
                <ShotsGridWrapper>
                    {/* <Suspense fallback={<Loading />}> */}
                        { children }
                    {/* </Suspense> */}
                </ShotsGridWrapper>
            </div>
            <SearchDock />
        </div>
    )
}

export default SearchLayout