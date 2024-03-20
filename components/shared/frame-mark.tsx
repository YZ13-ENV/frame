import { cdn } from "@darkmaterial/api"
import Image from 'next/image'

type Props = {
    className?: string
    size?: number
}
const FrameMark = ({ size = 36, className }: Props) => {
    return (
        <Image className={className || 'z-10'} src={cdn('dm/icons/frame-dark.svg')} width={size} height={size} alt='remote-logo' />
    )
}

export default FrameMark