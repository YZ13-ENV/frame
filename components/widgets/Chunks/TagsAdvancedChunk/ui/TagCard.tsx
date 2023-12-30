// import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'
import Link from 'next/link'

type TagCardProps = {
    tag: string
}
const TagCard = (params: TagCardProps) => {
    return (
        <Link href={`/tags/${params.tag}`}
        className='flex items-start justify-between aspect-[2/1] w-full p-4 transition-colors border cursor-pointer rounded-xl border-neutral-700 hover:bg-neutral-900'>
            <span className='text-base font-medium capitalize text-neutral-300'>{params.tag}</span>
            <BiRightArrowAlt size={19} />
        </Link>
    )
}

export default TagCard