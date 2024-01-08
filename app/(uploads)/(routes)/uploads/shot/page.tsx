import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
const DraftView = dynamic(() => import('@/app/(uploads)/_components/upload/draft-view')) 
const FinalTouch = dynamic(() => import('@/app/(uploads)/_components/upload/final-touch')) 
const LeftSidebar = dynamic(() => import('@/app/(uploads)/_components/upload/side-bars/left')) 
const RightSidebar = dynamic(() => import('@/app/(uploads)/_components/upload/side-bars/right')) 
const DraftWatcher = dynamic(() => import('@/app/(uploads)/_components/upload/tools/draft.watcher')) 
const UploaderHeader = dynamic(() => import('@/app/(uploads)/_components/upload/uploader-header')) 
import Link from 'next/link'
// import React from 'react'

const UploadShotPage = () => {
    return (
        <>
            <FinalTouch />
            <DraftWatcher />
            <div className="only-desktop-warning">
                <span className="text-sm text-center text-muted-foreground">Конструктор недоступен на мобильных устройствах</span>
                <Button asChild><Link href='/'>Вернуться</Link></Button>
            </div>
            <section className='constructor-wrapper'>
                {/* <FinalTouchModal /> */}
                <UploaderHeader />
                <div className="flex w-full h-full">
                    <div className='side-wrapper'>
                        <LeftSidebar />
                    </div>
                    <DraftView />
                    <div className='side-wrapper'>
                        <RightSidebar />
                    </div>
                </div>
            </section>
        </>
    )
}

export default UploadShotPage