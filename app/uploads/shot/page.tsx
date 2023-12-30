import dynamic from 'next/dynamic'
const DraftView = dynamic(() => import('@/components/widgets/Uploader/DraftView')) 
const FinalTouch = dynamic(() => import('@/components/widgets/Uploader/FinalTouch')) 
const LeftSidebar = dynamic(() => import('@/components/widgets/Uploader/SideBars/Left')) 
const RightSidebar = dynamic(() => import('@/components/widgets/Uploader/SideBars/Right')) 
const DraftWatcher = dynamic(() => import('@/components/widgets/Uploader/Tools/draft.watcher')) 
const UploaderHeader = dynamic(() => import('@/components/widgets/Uploader/UploaderHeader')) 
import Link from 'next/link'
// import React from 'react'

const UploadShotPage = () => {
    const sidesWrapper = "sticky lg:flex hidden overflow-y-auto flex-col h-full gap-4 p-4 top-4 xl:w-96 lg:w-80 md:w-72 w-64 shrink-0"
    return (
        <>
            <FinalTouch />
            <DraftWatcher />
            <div className="flex flex-col items-center justify-center w-full min-h-screen gap-4 md:hidden">
                <span className="text-sm text-center text-muted-foreground">Конструктор недоступен на мобильных устройствах</span>
                <Link href='/' className="px-4 py-2 text-sm text-black bg-white rounded-lg">Вернуться</Link>
            </div>
            <section className='relative z-0 flex-col hidden w-full min-h-screen h-fit md:flex shrink-0 bg-neutral-950'>
                {/* <FinalTouchModal /> */}
                <UploaderHeader />
                <div className="flex w-full h-full">
                    <div className={sidesWrapper}>
                        <LeftSidebar />
                    </div>
                    <DraftView />
                    <div className={sidesWrapper}>
                        <RightSidebar />
                    </div>
                </div>
            </section>
        </>
    )
}

export default UploadShotPage