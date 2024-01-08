import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

type Props = {
    children?: ReactNode
    props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}
const SquareButton = ({ children, props }: Props) => {
    return (
        <div {...props} className="relative flex items-center justify-center min-w-[2.5rem] h-10 border shrink-0 bg-card rounded-xl">
            { children }
        </div>
    )
}

export default SquareButton