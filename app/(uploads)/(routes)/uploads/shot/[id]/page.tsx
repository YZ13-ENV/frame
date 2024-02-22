import Blocks from '@/app/(uploads)/_components/upload/blocks'
import Controls from '@/app/(uploads)/_components/upload/header/controls'
import Side from '@/app/(uploads)/_components/upload/side'
import ViewBlocks from '@/app/(uploads)/_components/upload/view-blocks'
import RootBlock from '@/app/(uploads)/_components/upload/view-blocks/root-block'
import Title from '@/app/(uploads)/_components/upload/view-blocks/title'
import ShotAdaptiveWrapper from '@/components/shared/shot-adaptive-wrapper'
import { Button } from '@/components/ui/button'
import { bum, file, user } from 'api'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    params: {
        id: string
    }
}
const page = async ({ params }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const grid = await file.static.get('gird.svg')
    const draftId = params.id
    const draft = await bum.draft.get(draftId) || await bum.shot.get(draftId)
    const author = draft ? await user.byId.short(draft.authorId) : null
    const isAuthor = draft ? uid === draft.authorId : false
    if (!isAuthor || !draft) return JSON.stringify(draft, null, 2)
    return (
        <>
            {grid && <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' />}
            <div className="only-desktop-warning">
                <span className="text-sm text-center text-muted-foreground">Конструктор недоступен на мобильных устройствах</span>
                <Button asChild><Link href='/'>Вернуться</Link></Button>
            </div>
            <div className="relative flex flex-col items-center justify-center w-full h-screen">
                <Controls showPublish />
                <Side title={draft.title} draft={draft} hasSubscription={author ? author.isSubscriber : false} />
                <Blocks />
                <div className="w-full pt-24 mx-auto overflow-y-auto no-scrollbar">
                    <ShotAdaptiveWrapper>
                        <Title />
                        <RootBlock />
                        <ViewBlocks />
                    </ShotAdaptiveWrapper>
                </div>
            </div>
        </>
    )
}

export default page