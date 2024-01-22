import { user } from "@/api/user"
import { DocShotData } from "@/types/shot"
import Avatar from "../avatar"
import { BsEyeFill } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { BiSolidHeart } from "react-icons/bi";
import Link from "next/link"
import PlusBadge from "@/app/(settings)/_components/plus-badge";

type Props = {
    shot: DocShotData
}
const Footer = async({ shot }: Props) => {
    const author = await user.byId.short(shot.authorId)
    const haveComments = !!shot.comments.length
    return (
        <div className="w-full mt-3 h-6 shrink-0 flex items-center justify-between gap-3">
            {
                author
                ? <Link href={`/${author.nickname || author.uid}`} className="w-fit h-fit flex items-center justify-start gap-2">
                    <Avatar src={author.photoUrl} isSubscriber={author.isSubscriber} />
                    <span className="font-medium text-sm">{author.displayName}</span>
                    { author.isSubscriber && <PlusBadge /> }
                </Link>
                : <div />
            }

            <div className="w-fit h-fit flex items-center justify-end gap-2">
                {
                    haveComments &&
                    <div className="w-fit h-fit flex items-center justify-end gap-1">
                        <RiMessage3Fill />
                        <span className="text-sm">{shot.comments.length}</span>
                    </div>
                }
                <div className="w-fit h-fit flex items-center justify-end gap-1">
                    <BiSolidHeart />
                    <span className="text-sm">{shot.likes.length}</span>
                </div>
                <div className="w-fit h-fit flex items-center justify-end gap-1">
                    <BsEyeFill />
                    <span className="text-sm">{shot.views.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Footer