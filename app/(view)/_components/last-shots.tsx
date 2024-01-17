import { bum } from "@/api/bum"
import ShotCard from "@/components/shared/shot-card"

type Props = {
  authorId: string
}
const LastShots = async({ authorId }: Props) => {
    const lastShots = await bum.author.last(authorId)
    return (
      <div className="view-block-wrapper view-last-shots-wrapper view-wrapper-paddings py-0">
        {
          lastShots.length
          ? lastShots.map(shot =>
            <ShotCard key={'last-' + shot.doc_id} shot={shot} enableFooter={false} />
          )
          : null
        }
      </div>
    )
}

export default LastShots