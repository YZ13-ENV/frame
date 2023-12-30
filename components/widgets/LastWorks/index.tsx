'use client'
import Link from 'next/link'
import { Suspense, useLayoutEffect, useState } from 'react'
import WorkCard from './ui/WorkCard'
import { userAPI } from '@darkmaterial/api'
import { DocShotData } from '@darkmaterial/core/types'
import { host } from '@darkmaterial/core/const'

type Props = {
    userId: string
    order?: 'popular' | 'new'
    exclude?: string
}

const LastWorks = ({ userId, exclude, order }: Props) => {
    const [shots, setShots] = useState<DocShotData[]>([]) 
    const getLastWorks = async(userId: string, exclude: Props['exclude'], order: Props['order']) => {
        const userData = await userAPI.byId.short(userId)
        try {
            if (userData) {
                const res = await fetch(`${host}/shots/onlyShots/${userData.displayName}?limit=12&order=${order ? order : 'popular'}${exclude && `&exclude=${exclude}`}`)
                if (res.ok) {
                    const shots: DocShotData[] = await res.json()
                    setShots(shots)
                } else setShots([])
            } else throw new Error('Cant get user data')
        } catch(e) {
            console.log(e)
            setShots([])
        }
    }
    useLayoutEffect(() => {
        getLastWorks(userId, exclude, order)
    },[userId, exclude, order])
    if (!shots || shots.length === 0) return null
    return (
        <div className={`w-full h-fit gap-4 flex flex-col`}>
            <span className='text-lg font-medium'>Последние работы</span>
            {
                shots.map((shot, index) => {
                    return (
                        <Suspense key={shot.doc_id + index} fallback={
                            <Link href={`/view?s=${shot.doc_id}`}  className="flex items-center w-full h-32 gap-4 shrink-0">
                                <div className="h-full aspect-[4/3] rounded-lg bg-card border"></div>
                                <div className="flex flex-col justify-start w-full h-full gap-2">
                                    <span className='w-full h-6 rounded-md bg-card' />
                                    <span className='w-2/3 h-6 rounded-md bg-card' />
                                    <div className="flex flex-col w-full gap-2 mt-2 h-fit">
                                        <span className='w-1/2 h-4 rounded-md bg-card' />
                                        <div className="flex items-center w-full gap-2 h-fit">
                                            <span className='w-1/2 h-4 rounded-md bg-card' />
                                            <span className='w-1/2 h-4 rounded-md bg-card' />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        }>
                            <WorkCard index={index} shot={shot} />
                        </Suspense>

                    )
                })
            }
        </div>
    )
}

export default LastWorks