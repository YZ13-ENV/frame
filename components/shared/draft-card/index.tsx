import { Button } from "@/components/ui/button"
import { DocDraftShotData } from "@/types/shot"
import { DateTime } from "luxon"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"

type Props = {
    draft: DocDraftShotData
}
const DraftCard = ({ draft }: Props) => {
    return (
        <div className="draft-card">
            <div className="h-64 aspect-[4/3] rounded-lg bg-muted"></div>
            <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full h-fit flex items-center justify-between gap-4">
                    <div className="w-fit h-fit flex flex-col">
                        <span className="text-sm text-muted-foreground">Название</span>
                        <span className="text-base font-medium text-accent-foreground">{draft.title}</span>
                    </div>
                    <Button asChild className='gap-2' variant='outline'><Link href={`/uploads/shot/${draft.doc_id}`} 
                    className='flex items-center gap-2'>Открыть <BiRightArrowAlt /></Link></Button>
                </div>
                <div className="w-fit h-fit flex items-center gap-4">
                    <div className="w-fit h-fit flex flex-col">
                        <span className="text-sm text-muted-foreground">Черновик</span>
                        <span className="text-base text-accent-foreground">{draft.isDraft ? 'Да' : 'Нет'}</span>
                    </div>
                    <div className="w-fit h-fit flex flex-col">
                        <span className="text-sm text-muted-foreground">Обновлено</span>
                        <span className="text-base text-accent-foreground">{DateTime.fromSeconds(draft.updatedAt).setLocale('ru').toFormat(' HH:mm dd MMMM yyyy ')}</span>
                    </div>
                </div>
                <div className="w-fit h-fit flex items-center gap-4">
                    <div className="w-fit h-fit flex flex-col">
                        <span className="text-sm text-muted-foreground">Обложка</span>
                        <span className="text-base text-accent-foreground">{draft.thumbnail.id !== 0 ? 'Есть' : 'Не загружена'}</span>
                    </div>
                    <div className="w-fit h-fit flex flex-col">
                        <span className="text-sm text-muted-foreground">Вложений</span>
                        <span className="text-base text-accent-foreground">{draft.attachments.length}</span>
                    </div>
                </div>
                <div className="w-fit h-fit flex flex-col">
                    <span className="text-sm text-muted-foreground">Ссылка (Не работает для черновика)</span>
                    <span className="text-base text-accent-foreground">https://frame.darkmaterial.space/view?id={draft.doc_id}</span>
                </div>
            </div>
        </div>
    )
}

export default DraftCard