import { Button, ButtonProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Props = {
    button?: ButtonProps
    children: JSX.Element
    tooltip?: string
}
const KitButton = ({ children, tooltip, button }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Button size='icon' variant='secondary' {...button}>{children}</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <span>{tooltip}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default KitButton