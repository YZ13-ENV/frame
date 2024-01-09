import { Separator } from "@/components/ui/separator"
import { BiImage, BiText } from "react-icons/bi"
import { RiSeparator, RiEmojiStickerLine } from "react-icons/ri";
import { LuGalleryThumbnails } from "react-icons/lu";
import KitButton from "./kit-button";

const ToolKit = () => {
    return (
        <div className="p-2 rounded-xl bg-card flex flex-col h-fit gap-2">
            <KitButton tooltip="Текстовый блок">
                <BiText />
            </KitButton>
            <KitButton tooltip="Медиа блок">
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