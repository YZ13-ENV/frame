// import { Suspense } from 'react'
import Dock from '@/components/widgets/Dock/default'
import CategoryAndOrder from '@/app/shots/CategoryAndOrder'
import Image from 'next/image'
// import gird from 'ui/assets/gird.svg'
import { ScrollSensetiveBox } from '@darkmaterial/ui/widgets'
import { ShotsGridWrapper } from '@darkmaterial/ui/shared'
// import Loading from '@/components/shared/Loading'

type Props = {
    params: {
        order: string
        tag: string
    }
    children: string
}
const ShotByTagLayout = ({ params, children }: Props) => {
    return (
        <div className='flex flex-col w-full h-full min-h-screen gap-4'>
            <ScrollSensetiveBox>
                <div className="absolute top-0 left-0 z-[5] w-full h-full bg-gradient-to-t from-black via-transparent to-transparent" />
                <Image src={'gird'} fill className="object-cover -z-[1] opacity-30" alt="grid-layout" />
                <div className="relative z-10 w-full max-w-lg">
                    <h1 className='text-4xl font-bold text-center capitalize text-neutral-300'>{params.tag}</h1>
                </div>
            </ScrollSensetiveBox>
            <div className="flex flex-col w-full gap-4 h-fit">
                <CategoryAndOrder noCategory />
                <ShotsGridWrapper>
                    {/* <Suspense fallback={<Loading />}> */}
                        { children }
                    {/* </Suspense> */}
                </ShotsGridWrapper>
            </div>
            <Dock />
            {/* <Footer /> */}
        </div>
    )
}

export default ShotByTagLayout