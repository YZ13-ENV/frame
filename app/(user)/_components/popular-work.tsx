import { DocShotData } from "@/types/shot"
import Image from "next/image"

type Props = {
    shot: DocShotData
}
const PopularWork = async({ shot }: Props) => {
    return (
        <div className="pinned-work">
            {
                process.env.NODE_ENV !== 'development' &&
                <Image src={shot.thumbnail.url} fill alt='popular-shot' />
            }
        </div>
    )
}

export default PopularWork