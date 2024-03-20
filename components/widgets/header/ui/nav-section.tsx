import FrameMark from '@/components/shared/frame-mark'
import { cookies } from 'next/headers'
import Link from 'next/link'

type Props = {
}
const NavSection = ({ }: Props) => {
  const cookiesList = cookies()
  const uidCookie = cookiesList.get('uid')
  const visitorId = uidCookie ? uidCookie.value : null
  const preferredSortingCookie = cookiesList.get('sorting')
  const preferredSorting = preferredSortingCookie ? preferredSortingCookie.value : null
  const home_link = preferredSorting ? `/shots/${preferredSorting}` : visitorId ? '/shots/following' : '/shots/popular'
  return (
    <div className="w-fit h-fit mr-auto flex items-center justify-center gap-4">
      <Link href={home_link}>
        <FrameMark size={32} />
      </Link>
      <div className='flex items-center gap-2'>
        <div className='w-24 h-8 rounded-full bg-muted' />
        <div className='w-24 h-8 rounded-full bg-muted' />
        {/* <div className='w-24 h-8 rounded-full bg-muted' /> */}
        {/* <div className='w-24 h-8 rounded-full bg-muted' /> */}
      </div>
      {/* <FrameTitle /> */}
    </div>
  )
}

export default NavSection