import ShotCard from "@/components/shared/shot-card"
import { bum } from "@darkmaterial/api"

type Props = {
  authorId: string
}
const LastShots = async ({ authorId }: Props) => {
  const lastShots = await bum.author.last(authorId)
  return (
    <div className="grid shots_grid gap-4">
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