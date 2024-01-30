import { ShortUserData, team, user } from "api"
import type { DocTeam } from "api"

type UserVariant = { type: 'user' } & ShortUserData
type TeamVariant = { type: 'team' } & DocTeam
export const fetch_author = async(id: string): Promise<UserVariant | TeamVariant | null> => {
    const byId = await user.byId.short(id)
    const byNickname = await user.byNick.short(id, false) as unknown as ShortUserData | null
    const byTeamId = await team.get(id)
    if (!byId && !byNickname && !byTeamId) return null
    if (byId) {
      const result = byId
      return {
        ...result,
        type: 'user'
      } as UserVariant
    } else if (byNickname) {
      const result = byNickname
      return {
        ...result,
        type: 'user'
      } as UserVariant
    } else {
      const result = byTeamId
      return {
        ...result,
        type: 'team'
      } as TeamVariant
    }
}

export const author_config = (author: UserVariant | TeamVariant) => {
  const isNickname = author.type === 'user' ? !!author.nickname : false
  const uid = author.type === 'team' ? author.doc_id : author.uid
  const isTeam = author.type === 'team'
  return {
    type: author.type,
    isNickname: isNickname,
    isTeam: isTeam,
    uid: uid,
    data: author.type === 'team' ? author as TeamVariant : author as UserVariant
  }
}