'use client'

import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setRootBlock } from "@/components/entities/uploader/draft"
import { Button } from "@/components/ui/button"
import FileUploader from "@/components/widgets/file-uploader"
import { media_with_video_type } from "@/const/file-types"
import { Attachment, IdBlock, MediaBlock } from "@/types/shot"
import Image from "next/image"
import { GrDetach } from "react-icons/gr"


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
    const detach = () => {
        dispatch(setRootBlock({
            id: '',
            content_type: '',
            type: 'media'
        }))
    }
    const isImage = rootBlock.content_type.includes('jpg') || rootBlock.content_type.includes('png')
    const attachment = attachments.find(item => item.id === rootBlock.id)
    if (!rootBlock.id) return <FileUploader onAttachment={pickAttachment} allowedFileTypes={media_with_video_type} />
    return (
        <div className="w-full aspect-[4/3] rounded-xl relative bg-card border overflow-hidden">
            {
                rootBlock.id !== '0' &&
                <div className="w-fit h-fit p-2 z-20 absolute top-0 right-0">
                    <Button size='icon' onClick={detach}
                    variant='destructive'><GrDetach /></Button>
                </div>
            }
            {
                process.env.NODE_ENV !== 'development' &&
                isImage && attachment && <Image src={attachment.url} fill alt={attachment.contentType + attachment.createdAt} />
            }
        </div>
    )
}

export default RootBlock