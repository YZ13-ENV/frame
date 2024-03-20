import { Separator } from "@/components/ui/separator"
import { IdBlock, SeparatorProps } from "@darkmaterial/api"

type Props = {
    block: IdBlock<SeparatorProps>
    index: number
}
const SeparatorBlock = ({ block }: Props) => {
    if (block.withIcon) return (
        <div className='w-full h-fit flex items-center justify-center gap-4'>
            <Separator />
            <div className="w-9 h-9 rounded-full bg-muted shrink-0"></div>
            <Separator />
        </div>
    )
    return (
        <Separator />
    )
}

export default SeparatorBlock