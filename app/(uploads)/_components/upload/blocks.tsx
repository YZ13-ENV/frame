'use client'
import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useMemo, useState } from "react"
import { LuComponent } from "react-icons/lu";
import { BiChevronDown, BiChevronUp, BiImage, BiPin, BiTrashAlt } from "react-icons/bi";
import { getSize } from "@/helpers/filer";
import { Button } from "@/components/ui/button";
import ThumbnailBlock from "./view-blocks/thumbnail";
import { Attachment } from "@/types/shot";
import { file } from "@/api/file";
import { setAttachments } from "@/components/entities/uploader/draft";

const Blocks = () => {
    const [selected, setSelected] = useState<'0' | '1' | '2' | '3'>('0')
    const rootBlock = useAppSelector(state => state.uploader.draft.draft.rootBlock)
    const thumbnail = useAppSelector(state => state.uploader.draft.draft.thumbnail)
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const attachments = useAppSelector(state => state.uploader.draft.draft.attachments)
    const mediaBlocks = useMemo(() => { return blocks.filter(block => block.type === 'media') },[blocks])
    const dispatch = useAppDispatch()
    const removeAttachment = async(id: Attachment['id'], url: string) => {
        const withOutCDN = url.replace('https://cdn.darkmaterial.space/', '')
        await file.upload.delete(withOutCDN)
        const updatedAttachments = attachments.filter(attach => attach.id !== id)
        dispatch(setAttachments(updatedAttachments))
    }
    return (
        <div className="absolute bottom-0 z-10 px-4 border-t left-6 w-80 bg-card rounded-t-xl border-x">
            <Accordion type="single" value={selected} className="w-full">
                <AccordionItem value="1">
                    <AccordionTrigger onClick={() => setSelected(selected === '1' ? '0' : '1')}>
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <LuComponent />
                            Компоненты
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col w-full gap-2 h-fit">
                            {
                                blocks.length
                                ? blocks.map((block, i) =>
                                    <div key={block.id + ' ' + i} className="flex items-center justify-between w-full px-2 rounded-lg cursor-pointer h-9 hover:bg-muted">
                                        <span>
                                            { block.type }
                                            -
                                            { block.id }
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <BiChevronUp />
                                            <BiChevronDown />
                                        </div>
                                    </div>
                                )
                                : <div className="flex flex-col items-center justify-center w-full h-48 gap-4">
                                    <LuComponent size={28} className='text-muted-foreground' />
                                    <span className="text-sm text-center text-muted-foreground">Нет добавленных компонентов</span>
                                </div>
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2">
                    <AccordionTrigger onClick={() => setSelected(selected === '2' ? '0' : '2')}>
                        <div className="flex items-center gap-2 w-fit h-fit relative">
                            <BiImage />
                            Обложка
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ThumbnailBlock />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="3">
                    <AccordionTrigger onClick={() => setSelected(selected === '3' ? '0' : '3')}>
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <BiPin />
                            Прикрепленные файлы
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full h-fit flex flex-col gap-2">
                            {
                                attachments.map(attachment => {
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
                                                { size && <span className="text-xs">{size.size} {size.scale}</span> }
                                                <div className="w-full h-fit flex items-center gap-2 mt-auto">
                                                    <Button disabled={isUsed} size='sm'>{isUsed ? 'Используется' : 'Прикрепить'}</Button>
                                                    <Button onClick={() => removeAttachment(attachment.id, attachment.url)} disabled={isUsed}
                                                    size='icon' variant='destructive' className="shrink-0"><BiTrashAlt /></Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Blocks