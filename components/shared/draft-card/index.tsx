import { Button } from "@/components/ui/button"
import { DocDraftShotData } from "@/types/shot"
import { DateTime } from "luxon"
import Image from "next/image"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"

type Props = {
    draft: DocDraftShotData
}
const DraftCard = ({ draft }: Props) => {
    const link = `https://frame.darkmaterial.space/view?id=${draft.doc_id}`
    const hasThumbnail = !!draft.thumbnail.url.length
    return (
        <div className="draft-card">
            {
                hasThumbnail
                ? <Image src={draft.thumbnail.url} alt="thumbnail"
                fill className="!relative h-64 aspect-[4/3] rounded-lg bg-muted" />
                : <div className="h-64 aspect-[4/3] rounded-lg bg-muted" />
            }
            <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full h-fit flex items-center justify-between gap-4">
                    <div className="w-fit h-fit flex flex-col">
                        <span className="text-sm text-muted-foreground">Название</span>
                        <span className="text-base font-medium text-accent-foreground">{draft.title}</span>
                    </div>
                    <div className="w-fit h-fit flex items-center gap-2">
                        <Button asChild className='gap-2' variant='outline'><Link href={`/uploads/shot/${draft.doc_id}`}
                        className='flex items-center gap-2'>Открыть <BiRightArrowAlt /></Link></Button>
                    </div>
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
                        <span className="text-base text-accent-foreground">{hasThumbnail ? 'Есть' : 'Не загружена'}</span>
                    </div>
                    <div className="w-fit h-fit flex flex-col">
                        <span className="text-sm text-muted-foreground">Вложений</span>
                        <span className="text-base text-accent-foreground">{draft.attachments.length}</span>
                    </div>
                </div>
                <div className="w-fit h-fit flex flex-col">
                    <span className="text-sm text-muted-foreground">Ссылка (Не работает для черновика)</span>
                    <Link href={link} className="text-base text-accent-foreground">{link}</Link>
                </div>
            </div>
        </div>
    )
}

export default DraftCard