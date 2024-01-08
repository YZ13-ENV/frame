import { Drawer, DrawerContent } from '@/components/ui/drawer'
import LoginCenter from "../../_components/login";

const page = () => {
    return (
        <div className='w-full h-screen'>
            <Drawer open={true}>
                <DrawerContent className='max-w-sm mx-auto w-full shrink-0'>
                    <LoginCenter />
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default page