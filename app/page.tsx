
import { file } from '@/api/file'
import { config } from '@/app.config'
import RemoteLogo from '@/components/shared/remote/remote-logo'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const Dock = dynamic(() => import("@/components/widgets/dock/default"))

const HomePage = async() => {
    const grid = await file.static.get('gird.svg')
    return (
        <>
            <Dock />
            <div className='relative flex items-center justify-center w-full h-screen'>
                { grid && 
                    <>
                        <div className='w-full h-full z-0 absolute top-0 left-0 bg-gradient-to-b from-transparent to-background' /> 
                        <Image src={grid} fill className='z-[-2] object-cover opacity-40' alt='grid' />
                    </>
                }
                <RemoteLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={128} />
            </div>
            <div className='relative flex items-center justify-center w-full min-h-screen'>

            </div>
        </>
    )
}

export default HomePage