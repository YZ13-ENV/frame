import { bumAPI } from '@darkmaterial/api'
import { auth } from '@darkmaterial/core/utils'
import { Button } from '@darkmaterial/ui/shadcn'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiHeart, BiLoaderAlt, BiSolidHeart } from 'react-icons/bi'

type Props = {
    authorId: string
    doc_id: string
}
const LikeButton = ({ authorId, doc_id }: Props) => {
    const [isLiked, setLiked] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [user] = useAuthState(auth)
    const madeLike = async() => {
        if (user) {
            setLoading(true)
            const res = await bumAPI.like(authorId, doc_id, user.uid)
            setLoading(false)
            if (res) {
                setLiked(!isLiked)
            }
        }
    }
    return (
        <Button onClick={madeLike} variant={isLiked ? 'default' : 'outline'} size='default' className='gap-1 rounded-xl'>
            {
                loading
                ? <BiLoaderAlt size={20} className="animate-spin text-inherit" />
                : isLiked
                ? <BiSolidHeart size={20} />
                : <BiHeart size={20} />
            }
            <span className='text-sm text-inherit '>Нравится</span>
        </Button>
    )
}

export default LikeButton