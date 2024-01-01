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
            <div className="relative w-full cursor-pointer aspect-[4/3] overflow-hidden bg-background rounded-lg border group">
                <Link href={`/view?id=${shot.doc_id}`} className="absolute w-full h-full z-20" />
                { 
                    process.env.NODE_ENV === 'production' &&
                    shot.thumbnail
                    ? typeOfThumbnail === 'image' 
                    ? <Image src={cdn(shot.thumbnail.link)} fill alt='shot-thumbnail' /> 
                    : <video className="w-full absolute h-full"><source src={cdn(shot.thumbnail.link)} /></video>
                    : null
                }
                <div className="z-10 p-4 flex flex-col items-start justify-end w-full h-full bg-background transition-opacity via-accent to-transparent opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100">
                    <span>{shot.title}</span>
                </div>
            </div>
            <Footer shot={shot} />
        </div>
    )
}

export default ShotCard