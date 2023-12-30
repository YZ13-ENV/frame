import React from 'react'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { format } from '@darkmaterial/api/helpers'

type Props = {
    views: number
    createdAt: number
    tags: string[]
}
const Tags = ({ createdAt, tags, views }: Props) => {
    return (
        <div className="flex flex-col w-full gap-2 p-3 h-fit rounded-xl bg-opacity-40 backdrop-blur bg-card">
            <div className="flex items-center w-full gap-2 h-fit">
                <span>{format.numbers(views)} просмотров</span>
                <span className='text-sm text-neutral-400'>{DateTime.fromSeconds(createdAt).setLocale('ru').toRelativeCalendar()}</span>
            </div>
            <div className="flex flex-wrap items-start w-full gap-1 h-fit">
                { 
                    tags
                    .sort()
                    .map(tag => <Link key={tag} href={`/tags/${tag}`}
                        className='px-2 py-1 text-sm transition-colors border rounded-lg bg-card hover:text-card hover:bg-card-foreground'
                        >{tag}</Link>
                    ) 
                }
            </div>
        </div>
    )
}

export default Tags