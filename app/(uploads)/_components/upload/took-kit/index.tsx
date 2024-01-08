import { Separator } from "@/components/ui/separator"

const ToolKit = () => {
    return (
        <div className="p-2 rounded-xl bg-card flex flex-col h-fit gap-2">
            <div className="w-8 aspect-square rounded-lg bg-muted"></div>
            <Separator />
            <div className="w-8 aspect-square rounded-lg bg-muted"></div>
            <div className="w-8 aspect-square rounded-lg bg-muted"></div>
            <div className="w-8 aspect-square rounded-lg bg-muted"></div>
            <Separator />
            <div className="w-8 aspect-square rounded-lg bg-muted"></div>
        </div>
    )
}

export default ToolKit