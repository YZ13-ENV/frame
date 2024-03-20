'use client'
import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setAttachments } from "@/components/entities/uploader/draft"
import DropZone from "@/components/shared/drop-zone"
import { media_type } from "@/const/file-types"
import { format } from "@/helpers/format"
import { auth } from "@/utils/app"
import { Attachment, bum } from "@darkmaterial/api"
import { useAuthState } from "react-firebase-hooks/auth"

type Props = {
    onAttachment: (attachment: Attachment) => void
    allowedFileTypes?: string[]
}
const ThumbnailUploader = ({ onAttachment, allowedFileTypes = media_type }: Props) => {
    const [user] = useAuthState(auth)
    const draftId = useAppSelector(state => state.uploader.draft.draftId)
    const attachments = useAppSelector(state => state.uploader.draft.draft.attachments)
    const dispatch = useAppDispatch()
    const createAttachment = async (file: File) => {
        if (!allowedFileTypes.includes(file.type)) return null
        if (user) {
            const path = `users/${user.uid}/${draftId}`
            const attachment = await bum.attachments.generate(path, file)
            if (attachment) {
                const isDuplicatedId = attachments.find(item => attachment.id === item.id) !== undefined
                if (isDuplicatedId) {
                    attachment.id = String(format.generateId(6, true) as number)
                    dispatch(setAttachments([...attachments, attachment]))
                    onAttachment && onAttachment(attachment)
                } else {
                    dispatch(setAttachments([...attachments, attachment]))
                    onAttachment && onAttachment(attachment)
                }
            }
        }
    }
    return (
        <div className="w-full relative aspect-[4/3] rounded-lg border-dashed border-2 flex gap-2 items-center justify-center p-4 z-20 flex-col bg-background">
            <span className="text-xs text-center text-muted-foreground">Перенесите файл для загрузки</span>
            <span className="text-xs text-center text-muted-foreground">Не более 2МБ - .JPG .PNG</span>
            <DropZone onFile={file => createAttachment(file)} className="absolute top-0 left-0" />
        </div>
    )
}

export default ThumbnailUploader