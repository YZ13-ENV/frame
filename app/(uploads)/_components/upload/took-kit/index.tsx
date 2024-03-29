'use client'
import { useAppDispatch, useAppSelector } from "@/components/entities/store/store";
import { setBlocks } from "@/components/entities/uploader/draft";
import { Separator } from "@/components/ui/separator";
import { getDefaultBlock } from "@/const/default-blocks";
import { Blocks } from "@darkmaterial/api";
import { BiImage, BiText } from "react-icons/bi";
import { LuGalleryThumbnails } from "react-icons/lu";
import { RiEmojiStickerLine, RiSeparator } from "react-icons/ri";
import KitButton from "./kit-button";

type Props = {
    hasSubscription?: boolean
}
const ToolKit = ({ hasSubscription = false }: Props) => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const dispatch = useAppDispatch()
    const blockController = (blockType: Blocks['type']) => {
        const block = getDefaultBlock(blockType)
        dispatch(setBlocks([...blocks, block]))
    }
    return (
        <div className="flex flex-col gap-2 p-2 rounded-xl bg-card h-fit">
            <KitButton button={{ onClick: () => blockController('text') }} tooltip="Текстовый блок">
                <BiText />
            </KitButton>
            <KitButton button={{ onClick: () => blockController('media') }} tooltip="Медиа блок">
                <BiImage />
            </KitButton>
            <KitButton button={{ onClick: () => blockController('separator') }} tooltip="Разделительный блок">
                <RiSeparator />
            </KitButton>
            {
                hasSubscription &&
                <>
                    <Separator />
                    <KitButton button={{ onClick: () => blockController('sticker') }} tooltip="Стикер блок">
                        <RiEmojiStickerLine />
                    </KitButton>
                    <KitButton button={{ onClick: () => blockController('shotGrid') }} tooltip="Карусель">
                        <LuGalleryThumbnails />
                    </KitButton>
                </>
            }
        </div>
    )
}

export default ToolKit