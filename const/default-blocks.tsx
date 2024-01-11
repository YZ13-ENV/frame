import { format } from "@/helpers/format";
import { Blocks, MediaBlock, IdBlock, TextBlock, GalleryBlock, StickerBlock, SeparatorProps } from "@/types/shot";

export const getDefaultBlock = (blockType: Blocks['type']) => {
    switch (blockType) {
        case 'media':
            const media_block: IdBlock<MediaBlock> = {
                id: '0',
                content_type: '',
                type: 'media'
            }
            return media_block
        case 'text':
            const text_block: IdBlock<TextBlock> = {
                id: String(format.generateId(6, true) as number),
                type: 'text',
                text: ''
            }
            return text_block
        case 'separator':
            const separator_block: IdBlock<SeparatorProps> = {
                id: String(format.generateId(6, true) as number),
                type: 'separator',
                withIcon: false,
                uid: ''
            }
            return separator_block
        case "shotGrid":
            // TODO: Add check for subscription
            const gallery_block: IdBlock<GalleryBlock> = {
                id: String(format.generateId(6, true) as number),
                ids: [],
                title: '',
                type: 'shotGrid',
            }
            return gallery_block
        case "sticker":
            // TODO: Add check for subscription
            const sticker_block: IdBlock<StickerBlock> = {
                id: String(format.generateId(6, true) as number),
                code: '',
                rotate: 0,
                type: 'sticker',
                x: 0,
                y: 0
            }
            return sticker_block
        default:
            const default_block: IdBlock<TextBlock> = {
                id: String(format.generateId(6, true) as number),
                type: 'text',
                text: ''
            }
            return default_block
    }
}