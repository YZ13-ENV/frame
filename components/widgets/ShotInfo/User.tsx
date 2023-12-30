import { Suspense } from 'react'
// import fallbackImg from 'ui/assets/EmptyUser.svg'
import Link from "next/link"
import FollowButton from "../Dock/ui/FollowButton"
import { userAPI } from '@darkmaterial/api'
import { Avatar } from '@darkmaterial/ui/shared'

type Props = {
    uid?: string
    shotId: string
}
const User = async({ uid, shotId }: Props) => {
    const user = await userAPI.byId.short(uid)
    const Loading = () => <div className="flex items-center w-full gap-2 h-fit">
        <div className="rounded-full w-9 h-9 shrink-0 bg-neutral-900" />
        <div className="w-1/2 h-6 rounded-lg bg-neutral-900"></div>
    </div>
    if (!uid) return null
    return (
        <Suspense fallback={<Loading />}>
            <div className="flex items-center justify-start w-full gap-2 h-fit">
                <Link href={`/${user.displayName}`} className="flex items-center w-full gap-2 h-fit">
                    <Avatar size={36} src={user.photoUrl} isSub={user.isSubscriber} noLabel fallbackImage={'fallbackImg'} />
                    <span className="text-lg font-medium line-clamp-1 text-accent-foreground">{user.displayName}</span>
                </Link>
                <FollowButton author={uid} />
            </div>
        </Suspense>
    )
}

export default User