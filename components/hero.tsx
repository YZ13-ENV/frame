import { file } from '@/api/file'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { BiRightArrowAlt, BiChevronDown } from 'react-icons/bi'
import FrameMark from './shared/frame-mark'
import User from './shared/user-circle'
import Image from 'next/image'
import { Button } from './ui/button'

const HeroSection = async() => {
  const grid = await file.static.get('gird.svg')
  const cookiesList = cookies()
  const uidCookie = cookiesList.get('uid')
  const visitorId = uidCookie ? uidCookie.value : null
  const backLink = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://frame.darkmaterial.space'
  const loginLink = `https://auth.darkmaterial.space/login?continue=${backLink}`
  return (
    <div className='relative flex items-center justify-center w-full h-[90vh] flex-col px-6 gap-6'>
        { grid &&
            <>
                <div className='w-full h-full z-[-1] absolute top-0 left-0 bg-gradient-to-b from-transparent to-background' />
                <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' />
            </>
        }
        <div className="absolute p-6 top-0 right-0"><User /></div>
        <div className="w-fit h-fit flex items-center lg:gap-6 gap-4">
            <Link href='/shots/popular'>
                <FrameMark size={96} />
            </Link>
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
            <Button variant='outline'><Link href={visitorId ? '/shots/following' : '/shots/popular'}>К работам</Link></Button>
            {
                visitorId
                ? <Button><Link href={`/${visitorId}`}>К портфолио</Link></Button>
                : <Button><Link href={loginLink}>Войти в аккаунт</Link></Button>
            }
        </div>
        <div className="w-fit absolute flex bottom-3 items-center flex-col gap-2 justify-center text-muted-foreground">
            <span className='text-sm'>Примеры</span>
            <BiChevronDown size={24} className='animate-bounce' />
        </div>
    </div>
  )
}

export default HeroSection