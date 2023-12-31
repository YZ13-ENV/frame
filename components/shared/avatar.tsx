import Image, { StaticImageData } from "next/image"
import { memo } from "react"
import { BiUser } from "react-icons/bi"
import { PiCrownSimpleBold } from "react-icons/pi"

type Props = {
    size?: number
    isSubscriber?: boolean
    src: string | StaticImageData | null
    className?: string
}
const Avatar = ({ size=24, isSubscriber=false, src, className='' }: Props) => {
    const iconWrapperSize = size * .5
    const iconSize = iconWrapperSize * .5
    return (
        <div style={{ width: `${size}px`, height: `${size}px`}} 
        className={`relative flex items-center justify-center overflow-visible border rounded-full shrink-0 bg-background border-inherit ${className}`}>
            {
                src
                ? <Image src={src} className='rounded-full !relative' fill alt='@avatar' />
                : <BiUser size={size / 2} />
            }
            {
                isSubscriber &&
                <div style={{ 
                    // maxWidth: '64px',
                    // maxHeight: '64px',
                    top: `-${iconWrapperSize * .25}px`, 
                    left: `-${iconWrapperSize * .25}px`,
                    width: `${iconWrapperSize}px`,
                    height: `${iconWrapperSize}px`
                }} className="absolute flex items-center justify-center border-2 rounded-full text-muted-foreground border-background bg-muted">
                    <PiCrownSimpleBold size={iconSize} />
                </div>
            }
        </div>
    )
}
export default memo(Avatar)