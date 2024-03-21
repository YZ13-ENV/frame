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
    <div className="ld:!absolute md:!absolute lg:!left-0 md:!left-0 ml-6 w-fit h-fit">
      <Link href={home_link}>
        <FrameMark size={32} />
      </Link>
      {/* <div className='flex items-center gap-2'>
        <Link href="/shots">Вдохновение</Link>
      </div> */}
    </div>
  )
}

export default NavSection