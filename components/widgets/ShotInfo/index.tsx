import { ReactNode } from 'react'
import User from "./User"
import Tags from "./Tags"

type Props = {
  children: ReactNode
}
type Extensions = {
  User: typeof User
  Tags: typeof Tags
}
const ShotInfo = async({ children }: Props) => {
    return ( 
      <div className="z-20 flex flex-col w-full h-full gap-4 p-4 mx-auto mt-0 md:mt-32 md:mx-0 lg:max-w-md shrink-0">
        { children }
      </div>
    )
}

ShotInfo.User = User
ShotInfo.Tags = Tags

const Info = ShotInfo as typeof ShotInfo & Extensions
export default Info