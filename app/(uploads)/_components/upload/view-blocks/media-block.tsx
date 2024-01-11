'use client'

import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setBlocks } from "@/components/entities/uploader/draft"
import FileUploader from "@/components/widgets/file-uploader"
import { Attachment, IdBlock, MediaBlock } from "@/types/shot"
import Image from "next/image"

type Props = {
    block: IdBlock<MediaBlock>
    index: number
}
const MediaBlock = ({ block, index }: Props) => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const attachments = useAppSelector(state => state.uploader.draft.draft.attachments)
    const dispatch = useAppDispatch()
    const pickAttachment = (attachment: Attachment) => {
        const updatedBlock: Props['block'] = {
            ...block,
            id: attachment.id,
            content_type: attachment.contentType
        }
        const updatedBlocks = blocks.map((_, i) => {
            if (i === index) return updatedBlock
            return _
        })
        dispatch(setBlocks(updatedBlocks))
    }
    const isImage = block.content_type.includes('jpg') || block.content_type.includes('png')
    const attachment = attachments.find(item => item.id === block.id)
    if (block.id === '0') return <FileUploader onAttachment={pickAttachment} />
    return (
        <div className="w-full aspect-[4/3] rounded-xl relative bg-card border overflow-hidden">
            {
                process.env.NODE_ENV !== 'development' &&
                isImage && attachment && <Image src={attachment.url} fill alt={attachment.contentType + attachment.createdAt} />
            }
        </div>
    )
}

export default MediaBlock