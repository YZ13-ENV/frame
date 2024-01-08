'use client'
import { Button } from '@/components/ui/button'
import { BiLoaderAlt, BiLogoGoogle } from 'react-icons/bi'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { usePathname, useRouter } from 'next/navigation'
import { useCookieState } from 'ahooks'
import { useEffect } from 'react'

const GoogleLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
    const [val, setVal] = useCookieState('uid', { domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.darkmaterial.space' })
    const { push, refresh } = useRouter()
    const pathname = usePathname()
    const getSignIn = () => {
        signInWithGoogle()
        .then(res => {
            const user = res && res.user
            if (user) {
                setVal(user?.uid)
                if (pathname === '/') {
                    refresh()
                } else push('/')
            }
            // console.log(res)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        const userData = user && user.user
        if (userData) {
            setVal(userData.uid)
            if (pathname === '/') {
                refresh()
            } else push('/')
        }
    },[user])
    return (
        <Button disabled={loading || user !== undefined} onClick={getSignIn} className="h-12 gap-2 text-base rounded-lg">
            { 
                loading  
                ? <BiLoaderAlt className='animate-spin' />
                : <BiLogoGoogle />
            }
            Войти через Google
        </Button>
    )
}

export default GoogleLogin