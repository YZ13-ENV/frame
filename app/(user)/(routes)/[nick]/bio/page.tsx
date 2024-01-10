import { bum } from "@/api/bum"
import { user } from "@/api/user"
import PortfolioNav from "@/app/(user)/_components/nav"
import Avatar from "@/components/shared/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { redirect } from "next/navigation"
import { BiDotsVerticalRounded } from "react-icons/bi"

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
                <div className="flex justify-between w-full h-full gap-6 px-6 py-12 mx-auto max-w-screen-2xl">
                    <div className="flex flex-col justify-center h-full gap-4 w-fit">
                        <div className="flex items-center gap-4 w-fit h-fit">
                            { author?.photoUrl && <Avatar src={author?.photoUrl} size={96} /> }
                            <div className="flex flex-col justify-center h-full gap-2 w-fit">
                                <h1 className="text-4xl font-bold">{`@${author?.nickname || author?.displayName}`}</h1>
                                <span className="text-base text-muted-foreground">{author?.position || author?.email}</span>
                            </div>
                        </div>
                        <span className="text-5xl font-bold text-accent-foreground">Привет, я автор Frame</span>
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <span className="text-sm text-muted-foreground">{0} Подписчиков</span>
                            <span className="text-sm text-muted-foreground">{0} Подписок</span>
                            <span className="text-sm text-muted-foreground">{0} Лайков</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 w-fit h-fit">
                            <Button disabled>Подписаться</Button>
                            <Button disabled variant='outline'>Связаться</Button>
                            <Button disabled variant='ghost' size='icon'><BiDotsVerticalRounded /></Button>
                        </div>
                    </div>
                    <div className="flex items-center h-full w-fit">
                        {
                            popular &&
                            <div className="h-full aspect-[4/3] rounded-lg bg-muted"></div>
                        }
                    </div>
                </div>
            </div>
            <div className="w-full px-6 mx-auto max-w-screen-2xl">
                <PortfolioNav path={path} value="3" />
            </div>
            <div className="w-full py-12 lg:px-24 md:px-12 px-6 min-h-[20rem]">

            </div>
        </>
    )
}

export default page