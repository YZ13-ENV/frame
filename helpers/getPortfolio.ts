import { DocTeam, ShortUserData, team, user } from "@darkmaterial/api";
import { getVisitorId } from "./cookies";

type PortfolioTeamConfig = {
  type: "team";
  current: ShortUserData | null;
  data: DocTeam | null;
  relations: "member" | "founder" | "visitor";
};
type PortfolioUserConfig = {
  type: "user";
  current: ShortUserData | null;
  data: ShortUserData | null;
  isYou: boolean;
};
export type PortfolioConfig = PortfolioTeamConfig | PortfolioUserConfig;
// Всё просто, на вход идет id, на выход объект, где указывается команда пользователь и что-нибудь экстра.
// : Promise<TeamPageConfig>
// id может быть id команды, или пользователя
const getShortById = async (id: string) => {
  try {
    const result = await user.byId.short(id);
    if (typeof result?.status === "number") return null;
    return result;
  } catch (error) {
    return null;
  }
};
const getShortByNickname = async (id: string) => {
  try {
    const result = (await user.byNick.short(id, false)) as ShortUserData | null;
    if (typeof result?.status === "number") return null;
    return result;
  } catch (error) {
    return null;
  }
};
const getTeamInfo = async (id: string) => {
  try {
    const result = await team.get(id);
    // @ts-ignore
    if (typeof result?.status === "number") return null;
    return result;
  } catch (error) {
    return null;
  }
};
export const getPortfolio = async (id: string): Promise<PortfolioConfig> => {
  const visitorId = getVisitorId();
  const visitor = visitorId ? await user.byId.short(visitorId) : null;

  const isId = await getShortById(id);
  const isNickname = await getShortByNickname(id);
  const isTeam = await getTeamInfo(id);

  if (isTeam) {
    const { members, founder } = isTeam;
    const isFounder = visitor && founder === visitor.uid;
    const isMember = visitor && members.includes(visitor.uid);
    const isVisitor = !visitor || (!isFounder && !isMember);
    return {
      type: "team",
      current: visitor,
      data: isTeam,
      relations: isVisitor
        ? "visitor"
        : isMember
        ? "member"
        : isFounder
        ? "founder"
        : "visitor",
    };
  } else {
    const data = isId || isNickname;
    const isYou = visitor && data ? data.uid === visitor.uid : false;
    return {
      type: "user",
      current: visitor,
      data: data,
      isYou: isYou,
    };
  }
};
