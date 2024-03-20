import { useAppDispatch, useAppSelector } from '@/components/entities/store/store'
import { setBlocks } from '@/components/entities/uploader/draft'
import { IdBlock, TextBlock } from "@darkmaterial/api"
import { ForwardRefEditor } from "@darkmaterial/ui"

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
    return <ForwardRefEditor markdown={block.text} onChange={onChange} />
}

export default TextBlock