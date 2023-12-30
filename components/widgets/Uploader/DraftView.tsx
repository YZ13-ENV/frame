// import React from 'react'
// import gird from '@ui/assets/gird.svg'
// import Image from 'next/image'
import ShotAdaptiveWrapper from '@/components/shared/ShotAdaptiveWrapper'
import MediaUploader from './Tools/MediaUploader'
import TitleInput from './TitleInput'
import Blocks from './Blocks'
import StickerPicker from './Tools/StickerPicker'
import LocalDndContext from './Tools/DndContext'

const DraftView = () => {
    return (
        <div className='relative z-0 w-full max-w-6xl mx-auto overflow-y-auto bg-black h-fit rounded-3xl'>
            {/* <Image src={gird} fill className="z-[-5] object-cover opacity-20" alt="grid-layout" /> */}
            {/* <div className="absolute top-0 left-0 z-[-4] w-full h-full bg-gradient-to-t from-black via-transparent to-transparent" /> */}
            <LocalDndContext>
                <ShotAdaptiveWrapper>
                    <TitleInput />
                    <MediaUploader rootBlock />
                    <Blocks />
                    <StickerPicker />
                </ShotAdaptiveWrapper>
            </LocalDndContext>
        </div>
    )
}

export default DraftView