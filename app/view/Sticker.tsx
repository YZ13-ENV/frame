import { stickers } from '@darkmaterial/core/const'
import type { StickerBlock } from '@darkmaterial/core/types'
import Image from 'next/image'
import React from 'react'

type Props = {
    block: StickerBlock
}
const Sticker = ({ block }: Props) => {
    const sticker = stickers[block.code]
    return (
        <div className='absolute z-20 w-fit h-fit' style={{ transform: `translate3d(${block.x}px, ${block.y}px, 0px)` }}>
            <Image src={sticker} width={block.width ? `${block.width}` : 24} style={{ rotate: `${block.rotate}deg`} }
            height={block.height ? `${block.height}` : 24} alt='sticker' />
        </div>
    )
}

export default Sticker