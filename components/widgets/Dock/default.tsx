'use client'
import Image from 'next/image'
import { BiPlus } from 'react-icons/bi'
// import dm_plus from 'ui/assets/dm+.svg'
import Link from 'next/link'
import { useAppSelector } from '@/components/entities/store/store'
import DockLayout from './layout'

const Dock = () => {
    const isSub = useAppSelector(state => state.user.isSubscriber)
    return (
        <DockLayout>
            {
                !isSub &&
                <Link href='https://darkmaterial.space/plus'
                className="flex items-center justify-center h-12 gap-2 p-2 pr-2 border bg-card md:pr-4 w-fit rounded-xl">
                    <Image src={'dm_plus'} width={28} height={28} alt='dm+-logo' />
                    <span className='hidden text-sm font-medium md:inline'>Подписка</span>
                </Link>
            }
            <Link href='/uploads/shot'
            className="flex items-center justify-center h-12 gap-2 p-2 pr-2 border bg-card md:pr-4 w-fit rounded-xl">
                <BiPlus size={28} />
                <span className='hidden text-sm font-medium md:inline'>Поделиться работой</span>
            </Link>
        </DockLayout>
    )
}

export default Dock