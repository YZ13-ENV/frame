
type Props = {
    hideFooter?: boolean
}
const ShotSkeleton = ({ hideFooter = false }: Props) => {
    return (
        <div className="w-full h-full">
            <div className="relative w-full cursor-pointer aspect-[4/3] bg-background rounded-lg border group">
                <div className="z-10 absolute w-full h-full bg-gradient-to-br from-transparent transition-opacity via-muted to-transparent opacity-0 group-hover:opacity-50" />
            </div>
            {
                !hideFooter &&
                <div className="w-full mt-3 h-6 shrink-0 flex items-center justify-between gap-3">
                    <div className="w-1/2 h-full rounded-md bg-muted" />
                    <div className="w-1/3 h-full rounded-md bg-muted" />
                </div>
            }
        </div>
    )
}

export default ShotSkeleton