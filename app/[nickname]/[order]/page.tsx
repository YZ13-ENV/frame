import { Suspense } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import Chunk from '../../shots/Chunk'
import { ShotsGridWrapper } from '@darkmaterial/ui/shared'
import CategoryAndOrder from '@/app/shots/CategoryAndOrder'


type Props = {
    params: {
        nickname: string
        order: string
    }
}

const UserPage = async({ params }: Props) => {

    return (
        <>
            <CategoryAndOrder noCategory />
            <ShotsGridWrapper>
                <Suspense fallback={<div className='flex items-center justify-center w-full h-full'><BiLoaderAlt size={17} className='animate-spin' /></div>}>
                    <Chunk countPrefix={`/shots/user/count/${params.nickname}/${params.order}`} shotsPrefix={`/shots/user/${params.nickname}/${params.order}`} />
                </Suspense>
            </ShotsGridWrapper>
        </>
    )
}

export default UserPage