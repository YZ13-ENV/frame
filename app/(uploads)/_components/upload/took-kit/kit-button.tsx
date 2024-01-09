import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Props = {
    children: JSX.Element
    tooltip?: string
}
const KitButton = ({ children, tooltip }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Button size='icon' variant='secondary'>{ children }</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <span>{tooltip}</span>
                </TooltipContent>
            </Tooltip>  
        </TooltipProvider>
    )
}

export default KitButton