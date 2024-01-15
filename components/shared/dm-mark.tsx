import { cdn } from '@/helpers/cdn'
import Image from 'next/image'

type Props = {
    className?: string
    size?: number
}
const DMMark = ({ size=36, className }: Props) => {
    return (
        <Image className={className || 'z-10'} src={cdn('dm/icons/DM-dark.svg')} width={size} height={size} alt='remote-logo' />
    )
}

export default DMMark