import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft'
import { ForwardRefEditor } from '@/components/shared/markdown-v2-forward-ref'
import { IdBlock, TextBlock } from '@/types/shot'

type Props = {
    index: number
    block: IdBlock<TextBlock>
}
const TextBlock = ({ block, index }: Props) => {
    const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
    const dispatch = useAppDispatch()
    const onChange = (changed: string) => {
        const updatedBlock: Props['block'] = {
            ...block,
            text: changed
        }
        const updatedBlocks = blocks.map((_, i) => {
            if (i === index) return updatedBlock
            return _
        })
        dispatch(setBlocks(updatedBlocks))
    }
    return <ForwardRefEditor markdown={block.text || `Введите текст...`} onChange={onChange} />
}

export default TextBlock