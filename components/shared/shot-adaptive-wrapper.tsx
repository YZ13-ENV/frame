import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
    noPaddings?: boolean
}
const ShotAdaptiveWrapper = ({ children, noPaddings = false }: Props) => {
    return (
        <div className={cn(
            noPaddings ? "" : "px-8 md:px-4 py-14",
            "relative flex flex-col max-w-5xl w-full mx-auto gap-14 h-fit"
        )}>
            {children}
        </div>
    )
}

export default ShotAdaptiveWrapper