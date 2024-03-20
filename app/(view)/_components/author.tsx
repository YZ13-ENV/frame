import Avatar from "@/components/shared/avatar"
import { team as teamAPI, user } from "@darkmaterial/api"
import Link from "next/link"

type Props = {
  id: string
  teamId?: string
}
const Author = async ({ id, teamId }: Props) => {
  const author = await user.byId.short(id)
  const team = teamId ? await teamAPI.get(teamId) : undefined
  if (!author) return (
    <div className="w-fit h-fit flex items-center gap-2">
      <Link href={'/' + id}>
        <div className="w-12 h-12 rounded-full bg-muted" />
      </Link>
      <div className="w-fit h-full flex flex-col gap-1">
        <div className="w-36 h-6 rounded-md bg-muted"></div>
        <div className="w-24 h-4 rounded-md bg-muted"></div>
      </div>
    </div>
  )
  return (
    <div className="w-fit h-fit flex items-center gap-2">
      <Link href={'/' + (author.nickname ? author.nickname : id)}>
        <Avatar src={author.photoUrl} size={42}
          isSubscriber={teamId ? true : author.isSubscriber || false} />
      </Link>
      <div className="w-fit h-full flex flex-col">
        <span className="text-base font-semibold">{author.displayName}</span>
        {
          team
            ? <Link className="text-xs text-muted-foreground" href={`/${teamId}`}>{team.name}</Link>
            : <span className="text-xs text-muted-foreground">{author.position || author.email}</span>
        }
      </div>
    </div>
  )
}

export default Author