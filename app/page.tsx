
import { bum } from '@/api/bum'
import { file } from '@/api/file'
import { config } from '@/app.config'
import RemoteServerLogo from '@/components/shared/remote/remote-logo-server'
import Loading from './(shots)/(routes)/shots/[order]/loading'
import { Button } from '@/components/ui/button'
import AdvancedChunk from '@/components/widgets/chunk'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'
const Dock = dynamic(() => import("@/components/widgets/dock/default"))

const HomePage = async() => {
    const grid = await file.static.get('gird.svg')
    return (
        <>
            <Dock />
            <div className='relative flex items-center justify-center w-full h-[90vh] flex-col gap-4'>
                { grid && 
                    <>
                        <div className='w-full h-full z-0 absolute top-0 left-0 bg-gradient-to-b from-transparent to-background' /> 
                        <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' />
                    </>
                }
                <RemoteServerLogo className='z-10' dark={config.remote.logo.dark} light={config.remote.logo.light} size={128} />
                <div className="absolute scale-150 opacity-30 blur-xl">
                    <RemoteServerLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={128} />
                </div>
            </div>
            <div className='relative flex items-center justify-center w-full min-h-screen lg:px-12 py-6 px-6'>
                <div className="w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute left-0 z-40 bottom-0 w-full h-1/3 flex items-center justify-center">
                    <Button className='gap-2' asChild>
                        <Link href='/shots/popular' className='gap-2'>
                            Продолжить просмотр
                            <BiRightArrowAlt size={18} />
                        </Link>
                    </Button>
                </div>
                <Suspense fallback={ <Loading /> }>
                    <div className="w-full h-full grid shots_grid px-12 gap-6">
                        <AdvancedChunk hideController getter={ bum.shots.all } order={'popular'} />
                    </div>
                </Suspense>
            </div>
            <div className="w-full h-20"></div>
        </>
    )
}

export default HomePage