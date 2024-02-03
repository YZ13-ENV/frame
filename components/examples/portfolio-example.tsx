import AuthorBannerWrapper from "@/app/(user)/_components/banner/author-banner-wrapper"
import { format } from "@/helpers/format"
import { StarField } from "ui"

const PortfolioExample = () => {
  return (
    <AuthorBannerWrapper>
      <StarField />
      <div className="author-banner-wrapper">
        <div className="author-info-wrapper">
            <div className="flex items-center gap-4 w-fit h-fit">
                <div className="w-24 aspect-square rounded-full bg-muted shrink-0" />
                <div className="flex flex-col justify-center h-full gap-2 w-fit">
                    <h1 className="text-4xl font-bold">{`@User`}</h1>
                    <span className="text-base text-muted-foreground">Пользователь</span>
                </div>
            </div>
            <span className="author-description">Это может быть твоим портфолио</span>
            <div className="flex items-center gap-2 w-fit h-fit">
                <span className="text-sm text-muted-foreground">{format.numbers(100_250)} Подписчиков</span>
                <span className="text-sm text-muted-foreground">{format.numbers(1_000)} Подписок</span>
                <span className="text-sm text-muted-foreground">{format.numbers(1_000_000)} Лайков</span>
            </div>
            <div className="flex items-center gap-2 mt-2 w-fit h-fit">
                <button className="h-9 w-32 rounded-md bg-muted"></button>
                <button className="h-9 w-32 rounded-md bg-muted"></button>
                <button className="h-9 w-9 rounded-md bg-muted"></button>
            </div>
        </div>
        <div className="pinned-work-wrapper">
          <div className="pinned-work"></div>
        </div>
      </div>
    </AuthorBannerWrapper>
  )
}

export default PortfolioExample