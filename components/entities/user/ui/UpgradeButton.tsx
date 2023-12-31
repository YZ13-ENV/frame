import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { BsPatchCheck } from 'react-icons/bs'
// import React from 'react'

type Props = {
    isSubscriber: boolean
}
const UpgradeButton = ({ isSubscriber }: Props) => {
    if (!isSubscriber) return (
        <DropdownMenuItem className="text-black bg-white hover:!text-black hover:!bg-neutral-200 active:text-black active:bg-neutral-300">
            <span className="inline-flex items-center mx-auto text-inherit"><BsPatchCheck className='mr-2 text-inherit' />Улучшить до Плюс</span>
        </DropdownMenuItem>
    )
    return <DropdownMenuItem><span className="mx-auto text-neutral-400">Вы в плюсе</span></DropdownMenuItem>
}

export default UpgradeButton