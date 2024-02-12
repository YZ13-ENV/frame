// import Link from 'next/link'
// import FrameMark from './shared/frame-mark'
// import User from './shared/user-circle'
// import { Button } from './ui/button'
// import { getVisitorId } from '@/helpers/cookies'
// import { BiChevronDown, BiRightArrowAlt } from 'react-icons/bi'
import { StarField } from "ui"
import ShotSkeleton from "./skeletons/shot"
import Image from "next/image"
import { cdn } from "api"

const HeroSection = async() => {
//   const visitorId = getVisitorId()
//   const backLink = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://frame.darkmaterial.space'
//   const loginLink = `https://auth.darkmaterial.space/login?continue=${backLink}`
    return (
        <div className="w-full h-[200dvh] flex flex-col items-center justify-start gap-4 relative">
            {/* <StarField starsCount={100} /> */}
            <div className="w-full h-full">

                <div className="w-fit h-fit mx-auto max-w-lg z-20 flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-card sticky top-16">
                    <div className="flex items-center gap-4">
                        <Image src={cdn('/dm/icons/frame-dark.svg')} width={64} height={64} alt='frame-logo' />
                        <h1 className="text-5xl font-bold text-center">Frame</h1>
                    </div>
                    <span className="text-center text-base text-muted-foreground">
                        Публикуйте работы, создавайте команду, используйте профиль как портфолио
                    </span>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 py-4">
                <div className="w-full h-36 flex items-center justify-center gap-4 overflow-x-hidden">
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                </div>
                <div className="w-full h-36 flex items-center justify-center gap-4 overflow-x-hidden">
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                    <div className="max-w-sm aspect-[4/3] h-full">
                        <ShotSkeleton hideFooter />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection

// return (
//     <div className='relative flex items-center justify-center w-full h-screen flex-col px-6 gap-6'>
//         <StarField />
//         <div className="absolute p-6 top-0 right-0"><User /></div>
//         <div className="w-fit h-fit flex items-center lg:gap-6 gap-4">
//             <Link href='/shots/popular'>
//                 <FrameMark size={96} />
//             </Link>
//             <div className="w-fit h-fit flex flex-col">
//                 <span className='lg:text-6xl text-4xl font-bold'>Frame</span>
//                 <span className='inline-flex gap-1 items-center text-sm text-muted-foreground'>
//                     by <Link className='inline-flex gap-1 items-center' target='_blank' href='https://github.com/yz13-env'><b>YZ13</b> <BiRightArrowAlt /></Link>
//                 </span>
//             </div>
//         </div>
//         <span className='max-w-md text-center lg:text-base text-sm'>
//             Размещайте свои работы у нас, используйте страницу профиля как портфолио и делитесь им.
//         </span>
//         <div className="w-fit h-fit flex items-center gap-2">
//             <Button variant='outline'><Link href={visitorId ? '/shots/following' : '/shots/popular'}>К работам</Link></Button>
//             {
//                 visitorId
//                 ? <Button><Link href={`/${visitorId}`}>К портфолио</Link></Button>
//                 : <Button><Link href={loginLink}>Войти в аккаунт</Link></Button>
//             }
//         </div>
//         <div className="w-fit absolute flex bottom-3 items-center flex-col gap-2 justify-center text-muted-foreground">
//             <span className='text-sm'>Примеры</span>
//             <BiChevronDown size={24} className='animate-bounce' />
//         </div>
//     </div>
//   )