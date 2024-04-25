import { user } from "@darkmaterial/api"
import Link from 'next/link'
import { Suspense } from 'react'
import LastShots from './last-shots'

type Props = {
  authorId: string
}
const AuthorWorks = async ({ authorId }: Props) => {
  const author = await user.byId.short(authorId)
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="w-full h-fit flex gap-6" >
        {
          author
            ? <span className="text-muted-foreground text-lg font-semibold">Больше от<Link href={`/${author.nickname || authorId}`
            } className='text-accent-foreground' > {author?.nickname || author?.displayName}</Link ></span >
            : <span className='w-1/3 h-7 rounded-md bg-muted animate-pulse' />
        }
      </div>
      <Suspense fallback={
        <div className="grid shots_grid gap-4">
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