import ShotSkeleton from './shot'


type Props = {
    length?: number
}
const ShotsSkeleton = ({ length=12 }: Props) => {
    const arr = Array.from({ length: length }).map((_, i) => i)
    return (
        <div className="w-full h-full z-20 grid shots_grid gap-6">
            {
                arr.map(skeleton =>
                    <ShotSkeleton key={skeleton + '-shot-skeleton'} />
                )
            }
        </div>
    )
}

export default ShotsSkeleton