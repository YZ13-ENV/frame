import { DocShotData } from "api"
import Image from "next/image"
import Footer from "./footer"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
    shot: DocShotData
    enableFooter?: boolean
    enableOutline?: boolean
}

const ShotCard = ({ shot, enableFooter = true, enableOutline = false }: Props) => {
    const attachment = shot.attachments.find(attach => attach.id === shot.thumbnail.id)
    return (
        <div className="w-full h-full">
            <div className={cn(
                enableOutline ? "outline hover:outline-offset-4 outline-3 outline-transparent hover:outline-primary transition-all" : "",
                "relative w-full cursor-pointer aspect-[4/3] bg-background rounded-lg group/wrapper border"
            )}>
                <Link href={`/view/${shot.doc_id}`} className="absolute w-full h-full z-10 group">
                    <div className="p-4 flex flex-col items-start justify-end w-full h-full transition-opacity via-accent to-transparent opacity-0 group-hover:opacity-100">
                        <span>{shot.title}</span>
                    </div>
                </Link>
                {
                    process.env.NODE_ENV === 'production' &&
                    attachment &&
                    <Image src={attachment.url} className="z-0 group-hover/wrapper:brightness-50 transition-all" fill alt='shot-thumbnail' />
                }
            </div>
            {
                enableFooter &&
                <Footer shot={shot} />
            }
        </div>
    )
}

export default ShotCard