import { DocData } from "./common"

// Простые блоки
export type TextBlock = {
    type: 'text'
    text: string
    size?: 0 | 1 | 2 | 3
    align?: 'left' | 'center' | 'right'
    isBold?: boolean
    isItalic?: boolean
}

export type GalleryBlock = {
    type: 'shotGrid'
    title: string
    ids: string[]
}

export type StickerBlock = {
    type: 'sticker'
    x: number
    y: number
    width?: number
    height?: number
    rotate: number
    code: string
}

export type SeparatorProps = {
    type: 'separator'
    withIcon: boolean
    uid: string
}
// ---

// Более сложные блоки
export type MediaBlock = {
    type: 'media'
    id: number // значение берётся из attachments
    content_type: string // значение берётся из attachments
}
type RootBlock = MediaBlock
export type Blocks = MediaBlock | GalleryBlock | TextBlock | SeparatorProps | StickerBlock

export type NewCommentBlock = {
    authorId: string
    text: string
    createdAt: number
    answers: AnswerBlock[]
    reactions?: Reaction[]
}

export type AnswerBlock = Omit<CommentBlock, 'answers'>

export type Reaction = {
    reaction: {
        key: string
        emoji: string
    }
} & ActionWithUid

type ActionWithUid = {
    createdAt: number
    uid: string
}

export type CommentBlock = {
    id: string
    authorId: string
    text: string
    createdAt: number
    reactions?: Reaction[]
    answers: AnswerBlock[]
}

export type Thumbnail = {
    id: number
    contentType: Attachment['contentType']
    url: Attachment['url']
}

export type Attachment = {
    id: number
    size: number
    url: string
    contentType: string
    createdAt: number
}

// Первая загрузка черновика ( draft -> create(draft) )
export type DraftForUpload = {
    title: string
    rootBlock: RootBlock
    attachments: Attachment[]
    blocks: Blocks[]
    thumbnail: Thumbnail
    authorId: string
}
// Последующие загрузки черновика ( draft -> update(draft) )
export type DraftShotData = {
    isDraft: boolean
    authorId: string
    title: string
    attachments: Attachment[]
    rootBlock: RootBlock
    blocks: Blocks[]
    updatedAt: number
    thumbnail: Thumbnail
}
// Опубликованный черновик как работа ( draft -> shot )
export type ShotData = {
    isDraft: boolean
    authorId: string
    title: string
    attachments: Attachment[]
    rootBlock: RootBlock
    blocks: Blocks[]
    scheduledFor?: number
    createdAt: number
    updatedAt: number
    likes: ActionWithUid[]
    views: ActionWithUid[]
    comments: CommentBlock[]
    needFeedback: boolean
    tags: string[]
    thumbnail: Thumbnail
}

export type LoadedShot = DocData<ShotData>

export type DocShotData = DocData<ShotData>
export type DocDraftShotData = DocData<DraftShotData>

export type GroupedReactions = {
    key: string
    emoji: string
    uids: string[]
    length: number
}