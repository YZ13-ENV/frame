// import React from 'react'
import Dock from '@/components/widgets/Dock/default'
import AdvancedChunk from '@/components/widgets/Chunks/TagsAdvancedChunk'
import { bumAPI } from '@darkmaterial/api'

const TagsPage = () => {
    return (
        <div className='flex flex-col w-full max-w-5xl gap-4 p-4 mx-auto'>
            <Dock />
            <div className="flex flex-col items-center justify-center w-full gap-4 py-4 h-fit">
                <h1 className='text-2xl font-semibold text-center text-neutral-200'>Тэги</h1>
                <span className='text-sm text-center text-muted-foreground'>Здесь вы найдете все тэги собранные со всех работ, без повторений.</span>
            </div>
            <div className="grid w-full h-full gap-2 pb-20 shots_mini_grid">
                <AdvancedChunk getter={ bumAPI.shots.tags } />
            </div>
        </div>
    )
}

export default TagsPage