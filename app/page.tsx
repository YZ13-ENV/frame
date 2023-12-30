
import { BumLogo } from '@darkmaterial/ui/shared'
import dynamic from 'next/dynamic'
import Image from "next/image"
// import gird from 'ui/assets/gird.svg'
const Dock = dynamic(() => import("@/components/widgets/Dock/default"))

const HomePage = () => {
    return (
        <div className='relative flex items-center justify-center w-full min-h-screen'>
            <Image src={'gird'} fill className="z-0 object-cover opacity-20" alt="grid-layout" />
            <Dock />
            <BumLogo width={64} height={64} />
        </div>
    )
}

export default HomePage