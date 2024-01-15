import Link from 'next/link'
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'

const FrameTitle = () => {
    return (
        <div className="w-fit h-fit flex flex-col">
            <span className='text-xl font-bold'>Frame</span>
            <span className='inline-flex gap-1 items-center text-sm text-muted-foreground'>
                by <Link className='inline-flex gap-1 items-center' target='_blank' href='https://github.com/yz13-env'><b>YZ13</b> <BiRightArrowAlt /></Link>
            </span>
        </div>
    )
}

export default FrameTitle