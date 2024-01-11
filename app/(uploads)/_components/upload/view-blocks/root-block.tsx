'use client'

import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setRootBlock } from "@/components/entities/uploader/draft"
import FileUploader from "@/components/widgets/file-uploader"
import { Attachment, IdBlock, MediaBlock } from "@/types/shot"
import Image from "next/image"


const RootBlock = () => {
    const rootBlock = useAppSelector(state => state.uploader.draft.draft.rootBlock)
    const attachments = useAppSelector(state => state.uploader.draft.draft.attachments)
    const dispatch = useAppDispatch()
    const pickAttachment = (attachment: Attachment) => {
        const updatedBlock: IdBlock<MediaBlock> = {
            ...rootBlock,
            id: attachment.id,
            content_type: attachment.contentType
        }
        dispatch(setRootBlock(updatedBlock))
    }
    const isImage = rootBlock.content_type.includes('jpg') || rootBlock.content_type.includes('png')
    const attachment = attachments.find(item => item.id === rootBlock.id)
    if (rootBlock.id === '0') return <FileUploader onAttachment={pickAttachment} />
    return (
        <div className="w-full aspect-[4/3] rounded-xl relative bg-card border overflow-hidden">
            {
                process.env.NODE_ENV !== 'development' &&
                isImage && attachment && <Image src={attachment.url} fill alt={attachment.contentType + attachment.createdAt} />
            }
        </div>
    )
}

export default RootBlock