import { who } from "@/api/who"
import MemberCard from "@/app/(user)/_components/member-card"
import MemberCardSkeleton from "@/components/skeletons/member-card"
import { getVisitorId } from "@/helpers/cookies"
import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"

type Props = {
    params: {
        nick: string
    }
}
const page = async ({ params }: Props) => {
    const { nick } = params
    const visitor = getVisitorId()
    const portfolio = await who(nick, visitor || undefined)
    if (!portfolio) return notFound()
    if (portfolio.type === 'user') return redirect(`/${nick}`)
    // if (!isYou) redirect(`/${nickname}`)
    // if (config && config.data.type === 'user' && config.data.teamId === nickname) return redirect(`/${nickname}`)
    // if (
    // config && config.isNickname && author && config.data.type === 'user' && config.data.nickname && !teamId
    // && nickname !== config.data.nickname
    // ) return redirect(`/${config.data.nickname}/members`)
    if (!portfolio.data) return null
    return (
        <div className="w-full px-6 min-h-[17rem] py-24 max-w-screen-2xl mx-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-auto grid gap-4">
            {
                [...portfolio.data.members, portfolio.data.founder].map(
                    member =>
                        <Suspense fallback={<MemberCardSkeleton />} key={member + '-card'}>
                            <MemberCard memberId={member} />
                        </Suspense>
                )
            }
        </div>
    )
}

export default page