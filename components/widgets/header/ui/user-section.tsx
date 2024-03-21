import User from '@/components/shared/user-circle'
import { ProjectsGrid } from "@darkmaterial/ui"
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { BiSearch } from 'react-icons/bi'
const Notifications = dynamic(() => import('../../notifications'))

const UserSection = () => {
  return (
    <div className="ld:absolute md:absolute lg:right-0 md:right-0 mr-6 w-fit h-fit flex items-center rounded-full bg-muted justify-end">
      <Link href='/search' className='w-9 h-9 rounded-full border bg-background lg:hidden md:hidden flex items-center justify-center'>
        <BiSearch />
      </Link>
      <Notifications />
      <ProjectsGrid />
      <User />
    </div>
  )
}

export default UserSection