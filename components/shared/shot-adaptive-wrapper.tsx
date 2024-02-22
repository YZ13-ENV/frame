import { ReactNode } from 'react'

type Props = {
    children: ReactNode
    noPaddings?: boolean
}
const ShotAdaptiveWrapper = ({ children, noPaddings = false }: Props) => {
    return (
        <div className={`relative flex flex-col max-w-full w-full mx-auto ${noPaddings ? '' : 'px-8 md:px-4 py-14'} gap-14 md:max-w-2xl lg:max-w-4xl h-fit`}>
            {children}
        </div>
    )
}

export default ShotAdaptiveWrapper