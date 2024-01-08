import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col w-full h-screen">
            {children}
        </div>
    )
}

export default layout