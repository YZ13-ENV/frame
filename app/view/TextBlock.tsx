import type { TextBlock } from '@darkmaterial/core/types'
import { Markdown } from '@darkmaterial/ui/shared';

const TextBlock = ({ text, type }: TextBlock) => {
    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto h-fit">
            <Markdown>{text}</Markdown>
        </div>
    )
}

export default TextBlock