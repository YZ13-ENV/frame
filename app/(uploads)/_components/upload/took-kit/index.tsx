'use client'
import { Separator } from "@/components/ui/separator"
import { BiImage, BiText } from "react-icons/bi"
import { RiSeparator, RiEmojiStickerLine } from "react-icons/ri";
import { LuGalleryThumbnails } from "react-icons/lu";
import KitButton from "./kit-button";
import { useAppDispatch, useAppSelector } from "@/components/entities/store/store";
import { Blocks, IdBlock, MediaBlock, TextBlock } from "@/types/shot";
import { format } from "@/helpers/format";
import { setBlocks } from "@/components/entities/uploader/draft";

const ToolKit = () => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const dispatch = useAppDispatch()
    const blockController = (blockType: Blocks['type']) => {
        switch (blockType) {
            case 'media':
                const media_block: MediaBlock = {
                    id: format.generateId(6, true) as number,
                    content_type: '',
                    type: 'media'
                }
                dispatch(setBlocks([...blocks, media_block]))
                break;
            case 'text':
                const text_block: IdBlock<TextBlock> = {
                    id: format.generateId(6, true) as number,
                    type: 'text',
                    text: ''
                }
                dispatch(setBlocks([...blocks, text_block]))
                break;
            default:
                break;
        }
    }
    return (
        <div className="flex flex-col gap-2 p-2 rounded-xl bg-card h-fit">
            <KitButton button={{ onClick: () => blockController('text') }} tooltip="Текстовый блок">
                <BiText />
            </KitButton>
            <KitButton button={{ onClick: () => blockController('media') }} tooltip="Медиа блок">
                <BiImage />
            </KitButton>
            <KitButton tooltip="Разделительный блок">
                <RiSeparator />
            </KitButton>
            <Separator />
            <KitButton tooltip="Стикер блок">
                <RiEmojiStickerLine />
            </KitButton>
            <KitButton tooltip="Карусель">
                <LuGalleryThumbnails />
            </KitButton>
        </div>
    )
}

export default ToolKit