import { file } from "@/api/file"
import Image from "next/image"
import PortfolioNav from "../../_components/nav"
import AuthorBanner from "../../_components/author-banner"
import { bum } from "@/api/bum"
import Header from "@/components/widgets/header"
import Footer from "@/components/shared/footer"
import { getVisitorId } from "@/helpers/cookies"
import { author_config, fetch_author } from "@/helpers/portfolio-fetcher"

type Props = {
    children: JSX.Element | JSX.Element[]
    params: {
        nick: string
    }
}
export type AuthorInfo = {
    uid: string
    type: 'user' | 'team'
    photoURL: string | undefined
    name: string
    signature: string | undefined,
    position: string | null
}
const layout = async({ children, params }: Props) => {
    const grid = await file.static.get('gird.svg')
    const nick = params.nick
    const visitorId = getVisitorId()
    const author = await fetch_author(nick)
    const config = author ? author_config(author) : null
    const path = config && config.data.type === 'user' && config.isNickname ? `/${config.data.nickname}` : `/${nick}`
    const isYou = config && visitorId ? config.uid === visitorId : false
    const popular = config ? await bum.author.mostPopularShot(config.uid) : null
    // const isNotFound = author?.statusCode !== undefined
    // if (isNotFound) return notFound()
    return (
        <>
            {
                grid &&
                <>
                    <div className='w-full h-full z-[-1] max-h-screen absolute -top-[60px] left-0 bg-gradient-to-b from-transparent to-background' />
                    <Image src={grid} fill className='z-[-2] max-h-screen absolute !-top-[60px] left-0 object-cover opacity-40' alt='grid' />
                </>
            }
            <Header />
            {
                config &&
                <AuthorBanner author={{
                    type: config.type,
                    name: config.data.type === 'user' ? config.data.displayName : config.data.name,
                    signature: config.data.type === 'user' ? undefined : config.data.signature,
                    photoURL: config.data.type === 'user' ? config.data.photoUrl : config.data.photoURL,
                    position: config.data.type === 'user' ? config.data.position || null : null,
                    uid: config.uid
                }} popularShot={popular} visitorId={visitorId || ''} />
            }
            <div className="w-full px-6 my-6 mx-auto max-w-screen-2xl">
                <PortfolioNav path={path} isYou={isYou} />
            </div>
            { children }
            <Footer profileMode />
        </>
    )
}

export default layout