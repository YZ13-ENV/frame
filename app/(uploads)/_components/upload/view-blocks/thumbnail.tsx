'use client'

import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setThumbnail } from "@/components/entities/uploader/draft"
import ThumbnailUploader from "@/components/widgets/thumbnail-uploader"
import { Attachment, Thumbnail } from "@/types/shot"
import Image from "next/image"

const ThumbnailBlock = () => {
    const thumbnail = useAppSelector(state => state.uploader.draft.draft.thumbnail)
    const attachments = useAppSelector(state => state.uploader.draft.draft.attachments)
    const dispatch = useAppDispatch()
    const pickAttachment = (attachment: Attachment) => {
        const updatedThumbnail: Thumbnail = {
            id: attachment.id,
            contentType: attachment.contentType,
            url: attachment.url
        }
        dispatch(setThumbnail(updatedThumbnail))
    }
    const isImage = thumbnail.contentType.includes('jpg') || thumbnail.contentType.includes('png')
    const attachment = attachments.find(item => item.id === thumbnail.id)
    if (thumbnail.id === '0') return <ThumbnailUploader onAttachment={pickAttachment} />
    return (
        <div className="w-full aspect-[4/3] rounded-xl relative bg-card border overflow-hidden">
            {
                process.env.NODE_ENV !== 'development' &&
                isImage && attachment && <Image src={attachment.url} fill alt={attachment.contentType + attachment.createdAt} />
            }
        </div>
    )
}

export default ThumbnailBlock