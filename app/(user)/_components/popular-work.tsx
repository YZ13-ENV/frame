import { DocShotData } from "@/types/shot"

type Props = {
    shot: DocShotData
}
const PopularWork = async({ shot }: Props) => {
    return (
        <div className="pinned-work"></div>
    )
}

export default PopularWork