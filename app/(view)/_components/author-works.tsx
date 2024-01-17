import { user } from '@/api/user'
import React, { Suspense } from 'react'
import LastShots from './last-shots'
import Link from 'next/link'

type Props = {
  authorId: string
}
const AuthorWorks = async({ authorId }: Props) => {
  const author = await user.byId.short(authorId)
  return (
    <div className="w-full h-full flex flex-col border-b py-6 gap-6">
        <div className="w-full h-fit max-w-7xl mx-auto flex gap-6 view-wrapper-paddings">
          {
            author
            ? <span className="text-muted-foreground text-lg font-semibold">Последние работы от <Link href={`/${author.nickname || authorId}`} className='text-accent-foreground'>{author?.nickname || author?.displayName}</Link></span>
            : <span className='w-1/3 h-7 rounded-md bg-muted animate-pulse' />
          }
        </div>
        <Suspense fallback={
        <div className="view-block-wrapper view-last-shots-wrapper view-wrapper-paddings py-0">
            <div className="w-full aspect-[4/3] rounded-lg bg-muted"></div>
            <div className="w-full aspect-[4/3] rounded-lg bg-muted"></div>
            <div className="w-full aspect-[4/3] rounded-lg bg-muted"></div>
            <div className="w-full aspect-[4/3] rounded-lg bg-muted"></div>
        </div>
        }>
            <LastShots authorId={authorId} />
        </Suspense>
    </div>
  )
}

export default AuthorWorks