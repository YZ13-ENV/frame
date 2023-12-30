import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

type Props = {
    children?: ReactNode
    props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}
const SquareButton = ({ children, props }: Props) => {
    return (
        <div {...props} className="relative flex items-center justify-center w-12 h-12 border shrink-0 bg-card rounded-xl">
            { children }
        </div>
    )
}

export default SquareButton