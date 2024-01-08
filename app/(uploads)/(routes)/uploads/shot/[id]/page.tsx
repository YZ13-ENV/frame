import { file } from '@/api/file'
import Blocks from '@/app/(uploads)/_components/upload/blocks'
import FinalTouch from '@/app/(uploads)/_components/upload/final-touch'
import Controls from '@/app/(uploads)/_components/upload/header/controls'
import Side from '@/app/(uploads)/_components/upload/side'
import ShotAdaptiveWrapper from '@/components/shared/shot-adaptive-wrapper'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
// import React from 'react'

type Props = {
    params: {
        id: string
    }
}
const page = async({ params }: Props) => {
    const grid = await file.static.get('gird.svg')
    const draftId = params.id
    return (
        <>
            { grid && <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' /> }
            <FinalTouch />
            <div className="only-desktop-warning">
                <span className="text-sm text-center text-muted-foreground">Конструктор недоступен на мобильных устройствах</span>
                <Button asChild><Link href='/'>Вернуться</Link></Button>
            </div>
            <div className="w-full h-screen flex relative flex-col items-center justify-center">
                <Controls />
                <Side />
                <Blocks />
                <ShotAdaptiveWrapper>
                    <h1 className='text-center'>{draftId}</h1>
                    <div className="w-full rounded-xl bg-card aspect-[4/3]"></div>

                </ShotAdaptiveWrapper>
            </div>
        </>
    )
}

export default page