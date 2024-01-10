import { bum } from '@/api/bum'
import { file } from '@/api/file'
import Blocks from '@/app/(uploads)/_components/upload/blocks'
import FinalTouch from '@/app/(uploads)/_components/upload/final-touch'
import Controls from '@/app/(uploads)/_components/upload/header/controls'
import Side from '@/app/(uploads)/_components/upload/side'
import ViewBlocks from '@/app/(uploads)/_components/upload/view-blocks'
import Title from '@/app/(uploads)/_components/upload/view-blocks/title'
import ShotAdaptiveWrapper from '@/components/shared/shot-adaptive-wrapper'
import { Button } from '@/components/ui/button'
import FileUploader from '@/components/widgets/file-uploader'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
// import React from 'react'

type Props = {
    params: {
        id: string
    }
}
const page = async({ params }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const grid = await file.static.get('gird.svg')
    const draftId = params.id
    const draft = await bum.draft.get(draftId)
    const isAuthor = draft ? uid === draft.authorId : false
    if (!isAuthor || !draft) return JSON.stringify(draft, null, 2)
    return (
        <>
            { grid && <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' /> }
            <FinalTouch />
            <div className="only-desktop-warning">
                <span className="text-sm text-center text-muted-foreground">Конструктор недоступен на мобильных устройствах</span>
                <Button asChild><Link href='/'>Вернуться</Link></Button>
            </div>
            <div className="relative flex flex-col items-center justify-center w-full h-screen">
                <Controls />
                <Side title={draft.title} updatedAt={draft.updatedAt} draft={draft} />
                <Blocks />
                <div className="w-full pt-24 mx-auto overflow-y-auto no-scrollbar">
                    <ShotAdaptiveWrapper>
                        <Title />
                        <FileUploader />
                        <ViewBlocks />
                    </ShotAdaptiveWrapper>
                </div>
            </div>
        </>
    )
}

export default page