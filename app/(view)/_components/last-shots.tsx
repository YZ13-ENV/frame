import { bum } from "@/api/bum"

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
            <div key={'last-' + shot.doc_id} className="w-full aspect-[4/3] rounded-lg bg-background border"></div>
          )
          : null
        }
      </div>
    )
}

export default LastShots