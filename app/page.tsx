
import { file } from '@/api/file'
import { config } from '@/app.config'
import RemoteLogo from '@/components/shared/remote/remote-logo'
import ShotSkeleton from '@/components/skeletons/shot'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { BiRightArrowAlt } from 'react-icons/bi'
const Dock = dynamic(() => import("@/components/widgets/dock/default"))

const HomePage = async() => {
    const grid = await file.static.get('gird.svg')
    return (
        <>
            <Dock />
            <div className='relative flex items-center justify-center w-full h-[90vh]'>
                { grid && 
                    <>
                        <div className='w-full h-full z-0 absolute top-0 left-0 bg-gradient-to-b from-transparent to-background' /> 
                        <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' />
                    </>
                }
                <RemoteLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={128} />
            </div>
            <div className='relative flex items-center justify-center w-full min-h-screen p-6'>
                <div className="w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute left-0 z-20 bottom-0 w-full h-1/3 flex items-center justify-center">
                    <Button className='gap-2'>
                        Продолжить просмотр
                        <BiRightArrowAlt size={18} />
                    </Button>
                </div>
                <div className="w-full h-full grid shots_grid gap-6">
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                    <ShotSkeleton />
                </div>
            </div>
            <div className="w-full h-20"></div>
        </>
    )
}

export default HomePage