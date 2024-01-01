import { user } from "@/api/user"
import { DocShotData } from "@/types/shot"
import Avatar from "../avatar"
import { BiHeart, BiShow } from "react-icons/bi"

type Props = {
    shot: DocShotData
}
const Footer = async({ shot }: Props) => {
    const author = await user.byId.short(shot.authorId)
    return (
        <div className="w-full mt-3 h-6 shrink-0 flex items-center justify-between gap-3">
            {
                author
                ? <div className="w-fit h-fit flex items-center justify-start gap-2">
                    <Avatar src={author.photoUrl} isSubscriber={author.isSubscriber} />
                    <span className="text-sm">{author.displayName}</span>
                </div>
                : <div />
            }

            <div className="w-fit h-fit flex items-center justify-end gap-2">
                <div className="w-fit h-fit flex items-center justify-end gap-1">
                    <BiHeart />
                    <span className="text-sm">{shot.likes.length}</span>
                </div>
                <div className="w-fit h-fit flex items-center justify-end gap-1">
                    <BiShow />
                    <span className="text-sm">{shot.views.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Footer