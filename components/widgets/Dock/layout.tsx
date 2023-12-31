import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import RemoteLogo from '@/components/shared/remote/remote-logo'
import { config } from '@/app.config'
const UserButton = dynamic(() => import('./ui/UserButton'))
const SquareButton = dynamic(() => import('./ui/SquareButton'))

type Props = {
    children: ReactNode
}
const DockLayout = ({ children }: Props) => {
    return (
        <div className='fixed bottom-0 left-0 z-40 w-full py-4 h-fit'>
            <div className="flex items-center justify-center h-16 max-w-full gap-2 p-2 mx-auto bg-opacity-50 border bg-background backdrop-blur w-fit rounded-xl">
                <SquareButton>
                    <RemoteLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={28} />
                </SquareButton>
                <div className="w-[1px] h-full border" />
                { children }
                <div className="w-[1px] h-full border" />
                <SquareButton>
                    {/* <Notifications /> */}
                </SquareButton>
                <SquareButton>
                    {/* <ProductsGrid /> */}
                </SquareButton>
                <UserButton />
            </div>
        </div>
    )
}

export default DockLayout