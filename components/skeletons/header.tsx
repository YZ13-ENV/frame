import { Separator } from "../ui/separator"

type Props = {
  transparent?: boolean
}
const HeaderSkeleton = ({ transparent=true }: Props) => {
  return (
    <header className={`relative w-full h-fit flex top-0 left-0 items-center justify-end py-2 ${transparent ? '' : 'bg-card'} px-6 z-20`}>
      <div className="w-fit h-fit md:mx-auto mr-auto flex items-center justify-center gap-3">
        <div className="w-9 h-9 rounded-full shrink-0 bg-muted animate-pulse" />
        <Separator orientation="vertical" className="h-9 mx-1" />
        <div className="w-9 h-9 rounded-full shrink-0 bg-muted animate-pulse" />
        <div className="w-fit h-fit flex flex-col gap-1">
          <span className="w-20 h-5 rounded-md bg-muted animate-pulse" />
          <span className="w-20 h-5 rounded-md bg-muted animate-pulse" />
        </div>
      </div>
      <div className="absolute right-6 w-fit h-fit flex items-center gap-4 justify-end">
        <div className="w-9 h-9 rounded-full shrink-0 bg-muted animate-pulse" />
        <div className="w-9 h-9 rounded-full shrink-0 bg-muted animate-pulse" />
        <div className="w-9 h-9 rounded-full shrink-0 bg-muted animate-pulse" />
      </div>
    </header>
  )
}

export default HeaderSkeleton