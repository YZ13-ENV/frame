import FrameMark from '@/components/shared/frame-mark'
import FrameTitle from '@/components/shared/frame-title'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React, { ReactNode } from 'react'

type Props = {
  menu?: ReactNode
}
const NavSection = ({ menu }: Props) => {
  const cookiesList = cookies()
  const uidCookie = cookiesList.get('uid')
  const visitorId = uidCookie ? uidCookie.value : null
  const preferredSortingCookie = cookiesList.get('sorting')
  const preferredSorting = preferredSortingCookie ? preferredSortingCookie.value : null
  const home_link = preferredSorting ? `/shots/${preferredSorting}` : visitorId ? '/shots/following' : '/shots/popular'
  return (
    <div className="w-fit h-fit mr-auto flex items-center justify-center gap-3">
      {menu}
      <Link href={home_link}>
        <FrameMark size={32} />
      </Link>
      <FrameTitle />
    </div>
  )
}

export default NavSection