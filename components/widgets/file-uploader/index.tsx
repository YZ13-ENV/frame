'use client'
import DropZone from "@/components/shared/drop-zone"
import Description from "./description"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/app"
import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { format } from "@/helpers/format"
import { setAttachments } from "@/components/entities/uploader/draft"
import { media_type } from "@/const/file-types"
import { Attachment, bum } from "api"

type Props = {
    onAttachment?: (attachment: Attachment) => void
    allowedFileTypes?: string[]
}
const FileUploader = ({ onAttachment, allowedFileTypes = media_type }: Props) => {
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
        <div className="relative w-full rounded-xl bg-background border aspect-[4/3] p-4 flex flex-col items-center justify-center">
            <Description />
            <DropZone onFile={file => createAttachment(file)} className="absolute top-0 left-0" />
        </div>
    )
}

export default FileUploader