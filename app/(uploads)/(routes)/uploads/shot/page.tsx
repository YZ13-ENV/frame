import Header from '@/app/(uploads)/_components/hub/header'
import NewDraftButton from '@/app/(uploads)/_components/hub/new-draft-button'
import Controls from '@/app/(uploads)/_components/upload/header/controls'
import { Button } from '@/components/ui/button'
import AdvancedChunk from '@/components/widgets/draft-chunk'
import { getVisitorId } from '@/helpers/cookies'
import { bum, file, user } from 'api'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const page = async () => {
    const grid = await file.static.get('gird.svg')
    const visitorId = getVisitorId()
    const short = visitorId ? await user.byId.short(visitorId) : null
    const teamId = short ? short.teamId : null
    if (!visitorId) return redirect('/')
    return (
        <>
            {grid && <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' />}
            <div className="w-full h-full flex relative flex-col items-center justify-center">
                <Controls />
                <Header />
                <div className="max-w-5xl w-full mx-0 pt-24 flex flex-col px-6">
                    <div className="w-full h-fit flex items-center justify-between">
                        <h2 className='text-xl font-bold'>Черновики</h2>
                        <div className='flex items-center gap-2'>
                            {
                                teamId && <Button variant='outline' asChild>
                                    <Link href={`/uploads/${teamId}`}>К команде</Link>
                                </Button>
                            }
                            <NewDraftButton />
                        </div>
                    </div>
                    <div className="w-full h-fit flex flex-col py-6 gap-6">
                        <AdvancedChunk getter={bum.drafts.byUser(visitorId)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page