import ShotCard from "@/components/shared/shot-card"
import { DocShotData } from "@/types/shot"

type Props = {
    shot: DocShotData
}
const PopularWork = async({ shot }: Props) => {
    return (
        <div className="pinned-work">
            <ShotCard key={'popular-' + shot.doc_id} shot={shot} enableFooter={false} />
        </div>
    )
}

export default PopularWork