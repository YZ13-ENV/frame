import { user } from '@/api/user'
import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft'
import Avatar from '@/components/shared/avatar'
import { SeparatorProps, ShortUserData } from '@/types/shot'
import { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'

type Props = {
    block: SeparatorProps
    index: number
}
const Separator = ({ block, index }: Props) => {
    const [userData, setUserData] = useState<ShortUserData | null>(null)
    const dispatch = useAppDispatch()
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const setUnsetIcon = () => {
        const needIcon = !block.withIcon
        if (needIcon && userData) {
            const updatedBlock: SeparatorProps = {
                ...block,
                withIcon: needIcon as true,
                uid: userData.uid
            }
            const updatedBlocks = blocks.map((_, i) => {
                if (index === i && _.type === block.type) return updatedBlock
                return _
            })
            dispatch(setBlocks(updatedBlocks))
        } else {
            const updatedBlock: SeparatorProps = {
                ...block,
                withIcon: needIcon as false
            }
            const updatedBlocks = blocks.map((_, i) => {
                if (index === i && _.type === block.type) return updatedBlock
                return _
            })
            dispatch(setBlocks(updatedBlocks))
        }

    }
    useEffect(() => {
        if (block && block.withIcon) user.byId.short(block.uid)
        .then(data => setUserData(data))
    },[block.withIcon])
    return (
        <div className='flex items-center justify-center w-full gap-2 h-fit'>
            <hr className='w-full border-neutral-700' />
            { 
                !block.withIcon && 
                <div onClick={setUnsetIcon}
                className='flex items-center justify-center rounded-full cursor-pointer shrink-0 w-9 h-9 bg-neutral-900'>
                    <BiPlus size={24} className='text-neutral-400' />
                </div>
            }
            { 
                userData && block.withIcon && 
                <div onClick={setUnsetIcon}>
                    <Avatar src={userData.photoUrl} size={36} isSubscriber={userData.isSubscriber} /> 
                </div>
            }
            <hr className='w-full border-neutral-700' />
        </div>
    )
}

export default Separator