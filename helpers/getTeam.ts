import { DocTeam, ShortUserData, team, user } from "api"
import { getVisitorId } from "./cookies"

type PortfolioTeamConfig = {
  type: 'team'
  current: ShortUserData | null
  data: DocTeam | null
  relations: 'member' | 'founder' | 'visitor'
}
type PortfolioUserConfig = {
  type: 'user'
  current: ShortUserData | null
  data: ShortUserData | null
  isYou: boolean
}
export type PortfolioConfig = PortfolioTeamConfig | PortfolioUserConfig
// Всё просто, на вход идет id, на выход объект, где указывается команда пользователь и что-нибудь экстра.
// : Promise<TeamPageConfig>
export const getTeam = async(id: string): Promise<PortfolioConfig> => {
  const visitorId = getVisitorId()
  const visitor = visitorId ? await user.byId.short(visitorId) : null

  const isId = await user.byId.short(id)
  const isNickname = await user.byNick.short(id, false) as ShortUserData | null
  const isTeam = await team.get(id)

  if (isTeam) {
    const { members, founder } = isTeam
    const isFounder = visitor && founder === visitor.uid
    const isMember = visitor && members.includes(visitor.uid)
    const isVisitor = !visitor || !isFounder && !isMember
    return {
      type: 'team',
      current: visitor,
      data: isTeam,
      relations: isVisitor ? 'visitor' : isMember ? 'member' : isFounder ? 'founder' : 'visitor'
    }
  } else {
    const data = isId || isNickname
    const isYou = visitor && data ? data.uid === visitor.uid : false
    return {
      type: 'user',
      current: visitor,
      data: data,
      isYou: isYou
    }
  }
}