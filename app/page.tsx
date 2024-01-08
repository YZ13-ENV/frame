
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
import { BiChevronDown, BiRightArrowAlt } from 'react-icons/bi'
import { cookies } from 'next/headers'
import LoginDrawer from '@/components/widgets/login-drawer'
const Dock = dynamic(() => import("@/components/widgets/dock/default"))

const HomePage = async() => {
    const grid = await file.static.get('gird.svg')
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    return (
        <>
            {/* <Dock /> */}
            <div className='relative flex items-center justify-center w-full h-[90vh] flex-col px-6 gap-6'>
                { grid && 
                    <>
                        <div className='w-full h-full z-[-1] absolute top-0 left-0 bg-gradient-to-b from-transparent to-background' /> 
                        <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' />
                    </>
                }
                <div className="w-fit h-fit flex items-center lg:gap-6 gap-4">
                    <RemoteServerLogo className='z-10 lg:!w-28 !w-16' dark={config.remote.logo.dark} light={config.remote.logo.light} size={112} />
                    <div className="w-fit h-fit flex flex-col">
                        <span className='lg:text-6xl text-4xl font-bold'>Frame</span>
                        <span className='inline-flex gap-1 items-center text-sm text-muted-foreground'>
                            by <Link className='inline-flex gap-1 items-center' target='_blank' href='https://github.com/yz13-env'><b>YZ13</b> <BiRightArrowAlt /></Link>
                        </span>
                    </div>
                </div>
                <span className='max-w-md text-center lg:text-base text-sm'>
                    Размещайте свои работы у нас, используйте страницу профиля как портфолио и делитесь им.
                </span>
                <div className="w-fit h-fit flex items-center gap-2">
                    <Button variant='outline'><Link href='/shots/popular'>К работам</Link></Button>
                    {
                        uid 
                        ? <Button><Link href={`/${uid}`}>К портфолио</Link></Button>
                        : <LoginDrawer />
                    }
                </div>
                <div className="w-fit absolute flex bottom-3 items-center flex-col gap-2 justify-center text-muted-foreground">
                    <span className='text-sm'>Пример отображения работ</span>
                    <BiChevronDown size={24} className='animate-bounce' />
                </div>
            </div>
            <div className='relative flex items-center justify-center w-full min-h-screen py-6 lg:px-24 px-6'>
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
                    <div className="w-full h-full grid shots_grid gap-6">
                        <AdvancedChunk hideController getter={ bum.shots.all } order={'popular'} />
                    </div>
                </Suspense>
            </div>
        </>
    )
}

export default HomePage