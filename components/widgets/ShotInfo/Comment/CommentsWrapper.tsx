import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}
const CommentsWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full gap-4 h-fit">{children}</div>
  )
}

export default CommentsWrapper