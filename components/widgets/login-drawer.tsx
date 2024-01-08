'use client'
import { Button } from '../ui/button'
import { BiLoaderAlt, BiRightArrowAlt } from 'react-icons/bi'
import { Drawer, DrawerContent } from '../ui/drawer'
import LoginCenter from '@/app/(auth)/_components/login'
import { useState } from 'react'

const LoginDrawer = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <Button onClick={() => setOpen(true)} className='gap-2'>
                {
                    open
                    ? <><BiLoaderAlt className='animate-spin' size={20} /><span>Подождите</span></>
                    : <><span>Войти в профиль</span> <BiRightArrowAlt size={20} /></>
                }
            </Button>
            <Drawer open={open} onOpenChange={state => setOpen(state)}>
                <DrawerContent className='max-w-sm mx-auto w-full shrink-0'>
                    <LoginCenter />
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default LoginDrawer