import with_heart from '@/public/stickers/emoji/emoji-1.png'
import with_heart_2 from '@/public/stickers/emoji/emoji-2.png'
import stars_eyes from '@/public/stickers/emoji/emoji-3.png'
import mind_blow from '@/public/stickers/emoji/emoji-4.png'
import holyday from '@/public/stickers/emoji/emoji-5.png'
import devil_smile from '@/public/stickers/emoji/emoji-6.png'
import monkey_close_eye from '@/public/stickers/emoji/emoji-7.png'
import monkey_close_ears from '@/public/stickers/emoji/emoji-8.png'
import monkey_close_mouth from '@/public/stickers/emoji/emoji-9.png'
import eyes from '@/public/stickers/emoji/emoji-10.png'
import index_right from '@/public/stickers/emoji/emoji-11.png'
import index_left from '@/public/stickers/emoji/emoji-12.png'
import { StaticImageData } from 'next/image'

// Пример кода - ':cool : import'
export const stickers: { [key: string]: StaticImageData } = {
    ':with-heart': with_heart,
    ':with-heart-2': with_heart_2,
    ':stars-eyes': stars_eyes,
    ':mind-blow': mind_blow,
    ':holyday': holyday,
    ':devil-smile': devil_smile,
    ':monkey-close-eye': monkey_close_eye,
    ':monkey-close-ears': monkey_close_ears,
    ':monkey-close-mouth': monkey_close_mouth,
    ':eyes': eyes,
    ':index-right': index_right,
    ':index-left': index_left
}