import { user } from "@/api/user"
import Avatar from "@/components/shared/avatar"
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { Suspense } from "react"
import Loading from '@/app/(shots)/(routes)/shots/[order]/loading'
import AdvancedChunk from "@/components/widgets/chunk"
import { bum } from "@/api/bum"
import { redirect } from "next/navigation"

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
            <div className="w-full h-[50vh] pt-16">
                <div className="max-w-7xl w-full px-6 py-12 h-full mx-auto flex">
                    <div className="w-2/3 h-full flex flex-col justify-center gap-2">
                        { author?.photoUrl && <Avatar src={author?.photoUrl} size={64} /> }
                        <h1 className="text-4xl font-bold">{author?.displayName}</h1>
                        <span className="text-base text-muted-foreground">{author?.email}</span>
                    </div>
                    <div className="w-1/3 h-full flex items-center">
                        <div className="w-full aspect-[4/3] rounded-lg bg-muted"></div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl w-full px-6 mx-auto">
                <Tabs defaultValue="1">
                    <TabsList>
                        <TabsTrigger disabled value="1">Работы</TabsTrigger>
                        <TabsTrigger disabled value="2">Био</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="w-full py-12 lg:px-24 md:px-12 px-6 min-h-[17rem]">
                {
                    author && author.uid &&
                    <Suspense fallback={ <Loading /> }>
                        <div className="w-full h-full z-20 grid shots_grid gap-6">
                            <AdvancedChunk getter={ bum.shots.byUser } uid={author.uid} />
                        </div>
                    </Suspense>
                }
            </div>
        </>
    )
}

export default page