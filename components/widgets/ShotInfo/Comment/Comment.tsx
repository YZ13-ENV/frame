import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}
const Comment = ({ children }: Props) => {
    return (
        <div className="flex flex-col items-start w-full gap-2 p-3 border h-fit rounded-xl border-neutral-800">
            {children}
        </div>
    )
}

export default Comment