import { DocShotData, IdBlock, MediaBlock } from "@/types/shot"
import Image from "next/image"

type Props = {
    attachments: DocShotData['attachments']
    block: IdBlock<MediaBlock>
}
const MediaBlock = ({ attachments, block }: Props) => {
    const isImage = block.content_type.includes('jpg') || block.content_type.includes('png')
    const attachment = attachments.find(item => item.id === block.id)
    return (
        <div className="w-full aspect-[4/3] rounded-xl relative border overflow-hidden">
            {
                process.env.NODE_ENV !== 'development' &&
                isImage && attachment && <Image src={attachment.url} fill alt={attachment.contentType + attachment.createdAt} />
            }
        </div>
    )

}

export default MediaBlock