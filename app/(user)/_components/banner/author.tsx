import { PortfolioConfig } from "@/helpers/getPortfolio"
import { Avatar } from "ui"
import TeamHint from "./team-hint"


type Props = {
  portfolio: PortfolioConfig
}
const Author = ({ portfolio }: Props) => {
  if (portfolio.type === 'team' && portfolio.data) return (
      <div className="flex items-center gap-4 w-fit h-fit">
        {
          portfolio.data.photoURL
          ? <Avatar src={portfolio.data.photoURL} size={96} />
          : <div className="w-24 aspect-square rounded-full bg-muted shrink-0" />
        }
        <div className="flex flex-col justify-center h-full gap-2 w-fit">
            <h1 className="text-4xl font-bold">{portfolio.data.name}</h1>
            <span className="text-base text-muted-foreground">Команда</span>
        </div>
      </div>
  )
  if (portfolio.type === 'user' && portfolio.data) return (
    <div className="flex items-center gap-4 w-fit h-fit">
      {
        portfolio.data.photoUrl
        ? <Avatar src={portfolio.data.photoUrl} size={96} />
        : <div className="w-24 aspect-square rounded-full bg-muted shrink-0" />
      }
      <div className="flex flex-col justify-center h-full gap-2 w-fit">
          <h1 className="text-4xl font-bold">{`${portfolio.data.displayName}`}</h1>
          <div className="w-fit h-fit flex items-center gap-2">
            { portfolio.data.teamId && <TeamHint id={portfolio.data.teamId} /> }
            { portfolio.data.position && <span className="text-base text-muted-foreground">{portfolio.data.position}</span> }
          </div>
      </div>
    </div>
  )
  return null
}

export default Author