import { bum } from '@/api/bum'
import { file } from '@/api/file'
import Header from '@/app/(uploads)/_components/hub/header'
import NewDraftButton from '@/app/(uploads)/_components/hub/new-draft-button'
import Controls from '@/app/(uploads)/_components/upload/header/controls'
import { Button } from '@/components/ui/button'
import AdvancedChunk from '@/components/widgets/draft-chunk'
import { getVisitorId } from '@/helpers/cookies'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
// import React from 'react'

const page = async() => {
    const grid = await file.static.get('gird.svg')
    const visitorId = getVisitorId()
    if (!visitorId) return redirect('/')
    return (
        <>
            { grid && <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' /> }
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
                    <div className="w-full h-fit flex flex-col py-6 gap-6">
                         <AdvancedChunk getter={ bum.drafts.byUser(visitorId) } />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page