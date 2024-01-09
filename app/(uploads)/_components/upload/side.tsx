import { DocDraftShotData } from "@/types/shot"
import ToolKit from "./took-kit"
import { Button } from "@/components/ui/button"
import { BiChevronLeft } from "react-icons/bi"
import { DateTime } from "luxon"
import Link from "next/link"
import DraftWatcher from "../draft.watcher"

type Props = {
    draft: DocDraftShotData
    title: string
    updatedAt: DocDraftShotData['updatedAt']
}
const Side = ({ title, updatedAt, draft }: Props) => {
    return (
        <div className={`w-fit absolute top-0 left-0 h-screen flex flex-col`}>
            <header className="w-fit flex items-center gap-2 py-6 px-8">
                <Button variant='ghost' size='icon'><Link href='/uploads/shot'><BiChevronLeft size={20} /></Link></Button>
                <div className="w-fit h-fit flex flex-col">
                    <span className="text-xl font-semibold text-accent-foreground">{title}</span>
                    <DraftWatcher draft={draft} />
                </div>
            </header>
            <div className="w-full h-full flex px-6 gap-10">
                <ToolKit />
            </div>
        </div>
    )
}

export default Side