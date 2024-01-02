import { cdn } from "@/helpers/cdn"
import { DocShotData } from "@/types/shot"
import Image from "next/image"
import Footer from "./footer"
import Link from "next/link"

type Props = {
    shot: DocShotData
}

const ShotCard = ({ shot }: Props) => {
    const typeOfThumbnail = shot.thumbnail && shot.thumbnail.link.endsWith('.mp4') ? 'video' : 'image'
    return (
        <div className="w-full h-full">
            <div className="relative w-full cursor-pointer aspect-[4/3] overflow-hidden bg-background rounded-lg group/wrapper border">
                <Link href={`/view?id=${shot.doc_id}`} className="absolute w-full h-full z-20 group">
                    <div className="z-10 p-4 flex flex-col items-start justify-end w-full h-full transition-opacity via-accent to-transparent opacity-0 group-hover:opacity-100">
                        <span>{shot.title}</span>
                    </div>
                </Link>
                { 
                    process.env.NODE_ENV === 'production' &&
                    shot.thumbnail
                    ? typeOfThumbnail === 'image' 
                    ? <Image src={cdn(shot.thumbnail.link)} className="z-0 group-hover/wrapper:brightness-50 transition-all" fill alt='shot-thumbnail' /> 
                    : <video className="w-full absolute h-full z-0 group-hover/wrapper:brightness-50 transition-all"><source src={cdn(shot.thumbnail.link)} /></video>
                    : null
                }
            </div>
            <Footer shot={shot} />
        </div>
    )
}

export default ShotCard