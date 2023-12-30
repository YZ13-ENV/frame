'use client'
import { useRouter } from 'next/navigation'
import DockLayout from './layout'
import { DocShotData } from '@darkmaterial/core/types'
import FollowButton from './ui/FollowButton'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@darkmaterial/core/utils'

type Props = {
    shot?: DocShotData
}
const ViewDock = ({ shot }: Props) => {
    const [user] = useAuthState(auth)
    const router = useRouter()
    return (
        <DockLayout>
            {/* <div onClick={() => router.back()}
            className="flex items-center justify-center w-12 h-12 bg-black border cursor-pointer shrink-0 rounded-xl border-neutral-700">
                <BiLeftArrowAlt size={28}  />
            </div> */}
            {/* <div className="w-[1px] h-full bg-neutral-700" /> */}
            {
                user ?
                <>
                    {/* { shot && <LikeButton authorId={shot.authorId} doc_id={shot.doc_id} /> } */}
                    { shot && <FollowButton author={shot.authorId} /> }
                </>
                : <span className='text-sm text-neutral-300'>Недоступно</span>
            }
        </DockLayout>
    )
}

export default ViewDock