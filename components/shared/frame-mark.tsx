import { config } from '@/app.config'
import RemoteServerLogo from './remote/remote-logo-server'

type Props = {
    className?: string
    size?: number
}
const FrameMark = ({ size=36, className }: Props) => {
    return (
        <RemoteServerLogo className={className || 'z-10'} dark={config.remote.logo.dark} light={config.remote.logo.light} size={size} />
    )
}

export default FrameMark