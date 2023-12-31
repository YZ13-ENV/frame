import Link from 'next/link'
// @ts-ignore
import fallbackImg from '../../../../../public/other/empty.svg'
import { userAPI } from 'api/api/user'
import { Avatar } from '@ui/components/shared/Avatar'

type Props = {
    uid: string
}
const AuthorSnippet = async({ uid }: Props) => {
    const user = await userAPI.byId.short(uid)
    const isSub = user?.isSubscriber || false
    return (
        <Link href={`/${user?.displayName}`} className='shrink-0'>
            <Avatar src={user ? user.photoUrl : null} fallbackImage={fallbackImg} size={26} noLabel isSub={isSub} direction='left' />
        </Link>
    )
}

export default AuthorSnippet