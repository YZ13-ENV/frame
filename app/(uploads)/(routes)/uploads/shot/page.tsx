import { bum } from '@/api/bum'
import { file } from '@/api/file'
import Header from '@/app/(uploads)/_components/hub/header'
import NewDraftButton from '@/app/(uploads)/_components/hub/new-draft-button'
import FinalTouch from '@/app/(uploads)/_components/upload/final-touch'
import Controls from '@/app/(uploads)/_components/upload/header/controls'
import { Button } from '@/components/ui/button'
import AdvancedChunk from '@/components/widgets/draft-chunk'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
// import React from 'react'

type Props = {
    searchParams: {
        selected?: string
    }
}
const page = async({ searchParams }: Props) => {
    const grid = await file.static.get('gird.svg')
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    return (
        <>
            { grid && <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' /> }
            <FinalTouch />
            <div className="only-desktop-warning">
                <span className="text-sm text-center text-muted-foreground">Конструктор недоступен на мобильных устройствах</span>
                <Button asChild><Link href='/'>Вернуться</Link></Button>
            </div>
            <div className="w-full h-full flex relative flex-col items-center justify-center">
                <Controls />
                <Header />
                <div className="max-w-5xl w-full mx-0 pt-24 flex flex-col px-6">
                    <div className="w-full h-fit flex items-center justify-between">
                        <h2 className='text-xl font-bold'>Черновики</h2>
                        <NewDraftButton />
                    </div>
                    <div className="w-full h-fit flex flex-col py-6">
                        { uid && <AdvancedChunk getter={ bum.drafts.byUser } uid={uid} /> }
                    </div>
                </div>
            </div>
        </>
    )
}

export default page