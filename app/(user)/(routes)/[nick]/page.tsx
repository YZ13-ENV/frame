import { bum } from "@/api/bum"
import { user } from "@/api/user"
import Loading from '@/app/(shots)/(routes)/shots/[order]/loading'
import AdvancedChunk from "@/components/widgets/chunk"
import { redirect } from "next/navigation"
import { Suspense } from "react"

type Props = {
    params: {
        nick: string
    }
}
const page = async({ params }: Props) => {
    const byId = user.byId.short(params.nick)
    const byNickname = user.byNick.short(params.nick)
    const [dataById, dataByNickname] = await Promise.all([byId, byNickname])
    const author = dataByNickname ? dataByNickname : dataById
    const isNickname = author ? params.nick === author.nickname : false
    if (!isNickname && author && author.nickname) return redirect(`/${author.nickname}`)
    return (
        <>
            <div className="w-full p-6 min-h-[17rem] rounded-t-2xl border-t border-x bg-card max-w-screen-2xl mx-auto">
                {
                    author && author.uid &&
                    <Suspense fallback={ <Loading /> }>
                        <div className="z-20 grid w-full h-full gap-6 shots_grid">
                            <AdvancedChunk getter={ bum.shots.byUser } uid={author.uid} />
                        </div>
                    </Suspense>
                }
            </div>
        </>
    )
}

export default page