'use client'
import { file, Attachment } from "api"
import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setAttachments } from "@/components/entities/uploader/draft"
import { Button } from "@/components/ui/button"
import { getSize } from "@/helpers/filer"
import { useMemo } from "react"
import { BiPin, BiTrashAlt } from "react-icons/bi"

const Attachments = () => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const rootBlock = useAppSelector(state => state.uploader.draft.draft.rootBlock)
    const thumbnail = useAppSelector(state => state.uploader.draft.draft.thumbnail)
    const attachments = useAppSelector(state => state.uploader.draft.draft.attachments)
    const mediaBlocks = useMemo(() => { return blocks.filter(block => block.type === 'media') }, [blocks])
    const dispatch = useAppDispatch()
    const removeAttachment = async (id: Attachment['id'], url: string) => {
        const withOutCDN = url.replace('https://cdn.darkmaterial.space/', '')
        await file.upload.delete(withOutCDN)
        const updatedAttachments = attachments.filter(attach => attach.id !== id)
        dispatch(setAttachments(updatedAttachments))
    }
    return (
        <div className="w-full h-fit flex flex-col gap-2">
            {
                attachments.length
                    ? attachments.map(attachment => {
                        const size = getSize(attachment.size)
                        const isUsedInBlocks = mediaBlocks.find(block => block.type === 'media' && block.id === attachment.id) !== undefined
                        const isUsedInThumbnail = thumbnail.id === attachment.id
                        const isUsedInRootBlock = rootBlock.id === attachment.id
                        const isUsed = isUsedInBlocks || isUsedInThumbnail || isUsedInRootBlock
                        return (
                            <div className="w-full h-24 flex items-start gap-2">
                                <div className="h-full aspect-[4/3] bg-muted rounded-lg"></div>
                                <div className="w-1/2 h-full flex flex-col">
                                    <span className="font-medium">Файл #{attachment.id}</span>
                                    <span className="text-xs text-muted-foreground">{attachment.contentType}</span>
                                    {size && <span className="text-xs">{size.size} {size.scale}</span>}
                                    <div className="w-full h-fit flex items-center gap-2 mt-auto">
                                        <Button disabled={isUsed} size='sm'>{isUsed ? 'Используется' : 'Прикрепить'}</Button>
                                        <Button onClick={() => removeAttachment(attachment.id, attachment.url)} disabled={isUsed}
                                            size='icon' variant='destructive' className="shrink-0"><BiTrashAlt /></Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : <div className="flex flex-col items-center justify-center w-full h-48 gap-4">
                        <BiPin size={28} className='text-muted-foreground' />
                        <span className="text-sm text-center text-muted-foreground">Нет прикрепленных файлов</span>
                    </div>
            }
        </div>
    )
}

export default Attachments