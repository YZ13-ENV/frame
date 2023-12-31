import { cdn } from "@/helpers/cdn"
import { DocShotData } from "@/types/shot"
import Image from "next/image"

type Props = {
    shot: DocShotData
}

const ShotCard = ({ shot }: Props) => {
    const typeOfThumbnail = shot.thumbnail && shot.thumbnail.link.endsWith('.mp4') ? 'video' : 'image'
    return (
        <div className="w-full h-full">
            <div className="relative w-full cursor-pointer aspect-[4/3] bg-background rounded-lg border group">
                { 
                    shot.thumbnail
                    ? typeOfThumbnail === 'image' 
                    ? <Image src={cdn(shot.thumbnail.link)} fill alt='shot-thumbnail' /> 
                    : <video className="w-full absolute h-full"><source src={cdn(shot.thumbnail.link)} /></video>
                    : null
                }
                <div className="z-10 absolute w-full h-full bg-gradient-to-br from-transparent transition-opacity via-muted to-transparent opacity-0 group-hover:opacity-50" />
            </div>
            <div className="w-full mt-3 h-6 shrink-0 flex items-center justify-between gap-3">
                <span className="text-sm">{shot.authorId}</span>
                <div className="w-fit h-fit flex items-end gap-2"></div>
            </div>
        </div>
    )
}

export default ShotCard