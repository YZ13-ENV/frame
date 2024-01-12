
const ShotHeaderSkeleton = () => {
    return (
        <div className="w-full h-full flex flex-col border-t bg-card">
            <div className="w-full h-fit max-w-7xl mx-auto flex gap-4 view-wrapper-paddings">
                <div className="w-full h-20 flex items-center justify-between gap-4">
                    <div className="w-fit h-fit flex items-center gap-4">
                        <div className="w-fit h-fit flex items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-muted"></div>
                            <div className="w-fit h-full flex flex-col gap-1">
                                <div className="w-36 h-6 rounded-md bg-muted"></div>
                                <div className="w-24 h-4 rounded-md bg-muted"></div>
                            </div>
                        </div>
                        <button className="h-10 w-32 rounded-md bg-muted"></button>
                    </div>
                    <div className="w-fit h-fit flex items-center gap-4">
                        <div className="w-fit h-fit flex flex-col gap-1">
                            <div className="w-24 h-5 rounded-md bg-muted"></div>
                            <span className="text-4xl font-semibold">0</span>
                        </div>
                        <div className="w-fit h-fit flex flex-col gap-1">
                            <div className="w-24 h-5 rounded-md bg-muted"></div>
                            <span className="text-4xl font-semibold">0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShotHeaderSkeleton