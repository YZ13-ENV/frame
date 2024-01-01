import ShotSkeleton from '@/components/skeletons/shot'

const loading = () => {
    return (
        <div className="w-full h-full z-20 grid shots_grid gap-6">
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
            <ShotSkeleton />
        </div>
    )
}

export default loading