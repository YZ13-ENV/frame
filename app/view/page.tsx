import ShotAdaptiveWrapper from "@/components/shared/shot-adaptive-wrapper"

const page = () => {
    return (
        <>
            <ShotAdaptiveWrapper>
                <div className="w-full aspect-[4/3] rounded-xl bg-muted" />
            </ShotAdaptiveWrapper>
            <div></div>
        </>
    )
}

export default page