import React from 'react'
// import { flatten, uniq } from 'lodash'
// import TagsGround from './TagsGround'
// import bum from 'ui/api/bum'

const RecommendationsPage = async() => {
    // const shots = await bum.shots.all()
    // const onlyTags = uniq(flatten(shots.map(shot => shot.tags)))
    return (
        <section className='flex flex-col w-full h-full max-w-5xl gap-4 pb-8 mx-auto'>
            <h1 className='text-3xl font-semibold text-neutral-200'>Рекомендации</h1>
            <span className='text-sm text-neutral-400'>
                Здесь вы можете настроить рекомендации. Например, вы можете указать тэги которые вам интереснее других
                и они будут подняты выше остальных и вы увидите сначала то что интересно вам. 
            </span>
            <span className='text-sm text-neutral-400'>
                Мы сохраним всё автоматически, так что вам нужно только выбрать что вам интересно
            </span>
            <div className="w-full "></div>
            {/* <TagsGround tags={onlyTags} /> */}
        </section>
    )
}

export default RecommendationsPage

/*
<div className="flex items-center justify-center w-full gap-2 py-2 h-52">
    <div className="h-full aspect-[4/3] border rounded-xl flex items-center transition-colors duration-500 justify-center hover:border-neutral-200 border-neutral-800 hover:text-neutral-200 text-neutral-400">
        <BiPlus size={24} className='text-inherit' />
    </div>
    <div className="h-full aspect-[4/3] border rounded-xl flex items-center transition-colors duration-500 justify-center hover:border-neutral-200 border-neutral-800 hover:text-neutral-200 text-neutral-400">
        <BiPlus size={24} className='text-inherit' />
    </div>
</div>
*/