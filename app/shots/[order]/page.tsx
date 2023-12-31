import ShotSkeleton from '@/components/skeletons/shot'

type Props = {
    params: {
        order: string
    }
}
const page = ({ params }: Props) => {
    return (
        <>
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
        </>
    )
}

export default page