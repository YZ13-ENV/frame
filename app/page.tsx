
import { config } from '@/app.config'
import RemoteLogo from '@/components/shared/remote/remote-logo'
import dynamic from 'next/dynamic'
const Dock = dynamic(() => import("@/components/widgets/Dock/default"))

const HomePage = () => {
    return (
        <div className='relative flex items-center justify-center w-full min-h-screen'>
            <Dock />
            <RemoteLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={64} />
        </div>
    )
}

export default HomePage