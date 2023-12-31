export type ShortUserData = {
    uid: string
    photoUrl: string
    displayName: string
    email: string
    isSubscriber: boolean
    [key: string]: any
}

// Простые блоки
export type TextBlock = {
    type: 'text'
    text: string
    size?: 0 | 1 | 2 | 3
    align?: 'left' | 'center' | 'right'
    isBold?: boolean
    isItalic?: boolean
}

export type ImageBlock = {
    type: 'image'
    link: string
}

export type VideoBlock = {
    type: 'video'
    link: string
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
export type MediaBlock = VideoBlock | ImageBlock
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
    width: string
    height: string
    link: string
}

export type ShotForUpload = {
    title: string
    rootBlock: RootBlock
    blocks: Blocks[]
    thumbnail: Thumbnail | null
}

export type DraftShotData = {
    isDraft: boolean
    authorId: string
    title: string
    rootBlock: RootBlock
    blocks: Blocks[]
    createdAt: number
    thumbnail: Thumbnail | null
}

export type ShotData = {
    enableMdSyntax?: boolean
    isDraft: boolean
    authorId: string
    title: string
    rootBlock: RootBlock
    blocks: Blocks[]
    createdAt: number
    likes: ActionWithUid[]
    views: ActionWithUid[]
    comments: CommentBlock[]
    needFeedback: boolean
    tags: string[]
    thumbnail: Thumbnail | null
}

export type LoadedShot = { author: ShortUserData } & ShotData

export type DocShotData = { doc_id: string } & ShotData
export type DocDraftShotData = { doc_id: string } & DraftShotData

export type GroupedReactions = {
    key: string
    emoji: string
    uids: string[]
    length: number
}