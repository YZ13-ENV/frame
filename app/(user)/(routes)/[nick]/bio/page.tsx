import { bum } from "@/api/bum"
import { user } from "@/api/user"
import Avatar from "@/components/shared/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
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
    const popular = author ? bum.shot.getPopularOne(author.uid) : null
    const path = isNickname && author ? `/${author.nickname}` : `/${params.nick}`
    if (!isNickname && author && author.nickname) return redirect(`/${author.nickname}/bio`)
    return (
        <>
            <div className="w-full h-[50vh] pt-16">
                <div className="max-w-7xl w-full px-6 py-12 h-full mx-auto flex">
                    <div className="w-2/3 h-full flex flex-col justify-center gap-2">
                        { author?.photoUrl && <Avatar src={author?.photoUrl} size={96} /> }
                        <h1 className="text-4xl font-bold">{`@${author?.nickname || author?.displayName}`}</h1>
                        <span className="text-base text-muted-foreground">{author?.position || author?.email}</span>
                    </div>
                    <div className="w-1/3 h-full flex items-center">
                        {
                            popular &&
                            <div className="w-full aspect-[4/3] rounded-lg bg-muted"></div>
                        }
                    </div>
                </div>
            </div>
            <div className="max-w-7xl w-full px-6 mx-auto">
                <Tabs defaultValue="2">
                    <TabsList>
                        <TabsTrigger value="1"><Link href={path}>Работы</Link></TabsTrigger>
                        <TabsTrigger value="2"><Link href={path + '/bio'}>Био</Link></TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="w-full py-12 lg:px-24 md:px-12 px-6 min-h-[20rem]">

            </div>
        </>
    )
}

export default page