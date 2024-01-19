'use client'

import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setThumbnail } from "@/components/entities/uploader/draft"
import { Button } from "@/components/ui/button"
import ThumbnailUploader from "@/components/widgets/thumbnail-uploader"
import { Attachment, Thumbnail } from "@/types/shot"
import Image from "next/image"
import { GrDetach } from "react-icons/gr"

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
    const detachThumbnail = () => {
        dispatch(setThumbnail({
            id: '',
            contentType: '',
            url: ''
        }))
    }
    const isImage = thumbnail.contentType.includes('jpg') || thumbnail.contentType.includes('png')
    const attachment = attachments.find(item => item.id === thumbnail.id)
    if (!thumbnail.id) return <ThumbnailUploader onAttachment={pickAttachment} />
    return (
        <div className="relative w-full aspect-[4/3] rounded-xl bg-card border overflow-hidden">
            {
                thumbnail.url.length !== 0 &&
                <div className="w-fit h-fit p-2 z-20 absolute top-0 right-0">
                    <Button size='icon' onClick={detachThumbnail}
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

export default ThumbnailBlock