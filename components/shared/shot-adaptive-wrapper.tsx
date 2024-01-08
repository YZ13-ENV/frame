import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}
const ShotAdaptiveWrapper = ({ children }: Props) => {
    return (
        <div className="relative flex flex-col max-w-full w-full px-8 mx-auto py-14 md:px-4 gap-14 md:max-w-2xl lg:max-w-4xl h-fit">
            { children }
        </div>
    )
}

export default ShotAdaptiveWrapper