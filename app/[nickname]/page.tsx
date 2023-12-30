import Chunk from '../shots/Chunk'
import { ShotsGridWrapper } from '@darkmaterial/ui/shared'
import CategoryAndOrder from '../shots/CategoryAndOrder'


type Props = {
    params: {
        nickname: string
    }
}

const UserPage = async({ params }: Props) => {

    return (
        <>
            <CategoryAndOrder noCategory />
            <ShotsGridWrapper noHorizontalPadding>
                <Chunk countPrefix={`/shots/user/count/${params.nickname}/popular`} shotsPrefix={`/shots/user/${params.nickname}/popular`} />
            </ShotsGridWrapper>
        </>
    )
}

export default UserPage