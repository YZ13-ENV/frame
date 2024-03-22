import { cn } from "@/lib/utils"
import { DocShotData, IdBlock, MediaBlock } from "@darkmaterial/api"

import Image from "next/image"
import ColorExtractor from "./color-extractor"

type Props = {
    attachments: DocShotData['attachments']
    block: IdBlock<MediaBlock>
}
const MediaBlock = ({ attachments, block }: Props) => {
    const isImage = block.content_type.includes('jpg') || block.content_type.includes('png')
    const attachment = attachments.find(item => item.id === block.id)
    const isDev = process.env.NODE_ENV === 'development'
    const src = attachment ? attachment.url : null

    return (
        <div className={cn(
            isDev ? "border" : "",
            "w-full aspect-video rounded-xl relative overflow-hidden"
        )}>
            {src && <ColorExtractor src={src} />}
            {
                !isDev &&
                isImage && attachment &&
                <Image src={attachment.url} fill alt={attachment.contentType + attachment.createdAt} crossOrigin="anonymous" />
            }
        </div>
    )

}

export default MediaBlock