
const ShotSkeleton = () => {
    return (
        <div className="w-full h-full">
            <div className="w-full aspect-[4/3] rounded-lg border"></div>
            <div className="w-full mt-3 h-6 shrink-0 flex items-center justify-between gap-3">
                <div className="w-1/2 h-full rounded-md bg-muted" />
                <div className="w-1/3 h-full rounded-md bg-muted" />
            </div>
        </div>
    )
}

export default ShotSkeleton