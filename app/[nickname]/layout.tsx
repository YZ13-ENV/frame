import { Suspense, ReactNode } from 'react'
import { userAPI } from '@darkmaterial/api'
import ProfileSidebar from '@/components/widgets/ProfileSidebar'
import Dock from '@/components/widgets/Dock/default'
import { UserBanner, DefaultFooter } from '@darkmaterial/ui/widgets'

type Props = {
    params: {
        nickname: string
    },
    children: ReactNode
}
const UserLayout = async({ children, params }: Props) => {
    const user = await userAPI.byNickname.short(params.nickname)
    if (!user) return null
    return (
        <div className="flex flex-row items-start w-full min-h-screen gap-4 px-4 pt-4 h-fit md:px-12">
            <Dock />
            <ProfileSidebar uid={params.nickname} author={user} />
            <section className="flex flex-col w-full h-full gap-4">
                <Suspense fallback={<div className='w-full h-[30rem] rounded-xl animate-pulse bg-neutral-900' />}>
                    <UserBanner nickname={params.nickname} />
                </Suspense>
                {children}
                <DefaultFooter />
            </section>
        </div>
    )
}

export default UserLayout