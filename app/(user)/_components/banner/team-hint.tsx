import { team } from "api"
import Link from "next/link"

type Props = {
  id: string
}
const TeamHint = async({ id }: Props) => {
  const teamInfo = await team.get(id)
  if (!teamInfo) return null
  return (
    <Link href={`/${teamInfo.doc_id}`}
    className="text-xs px-3 py-1 rounded-full text-muted-foreground bg-muted border">{ teamInfo.name }</Link>
  )
}

export default TeamHint