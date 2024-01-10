import { DocDraftShotData } from "@/types/shot"
import ToolKit from "./took-kit"
import { Button } from "@/components/ui/button"
import { BiChevronLeft } from "react-icons/bi"
import Link from "next/link"
import DraftWatcher from "../draft.watcher"

type Props = {
    draft: DocDraftShotData
    title: string
}
const Side = ({ title, draft }: Props) => {
    return (
        <>
            <header className="absolute top-0 left-0 flex items-center gap-2 pt-6 pl-6 w-fit">
                <Button variant='ghost' size='icon'><Link href='/uploads/shot'><BiChevronLeft size={20} /></Link></Button>
                <div className="flex flex-col w-fit h-fit">
                    <span className="text-xl font-semibold text-accent-foreground">{title}</span>
                    <DraftWatcher draft={draft} />
                </div>
            </header>
            <div className="absolute left-0 flex gap-10 pl-6 w-fit h-fit">
                <ToolKit />
            </div>
        </>
    )
}

export default Side