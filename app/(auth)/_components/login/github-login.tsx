'use client'
import { Button } from '@/components/ui/button'
import { BiLoaderAlt, BiLogoGithub } from 'react-icons/bi'
import { useSignInWithGithub } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/app'
import { usePathname, useRouter } from 'next/navigation'
import { useCookieState } from 'ahooks'
import { useEffect } from 'react'

const GithubLogin = () => {
    const [signInWithGithub, user, loading, error] = useSignInWithGithub(auth)
    const [val, setVal] = useCookieState('uid', { domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.darkmaterial.space' })
    const { push, refresh } = useRouter()
    const pathname = usePathname()
    const getSignIn = () => {
        signInWithGithub()
        .then(res => {
            const user = res && res.user
            if (user) {
                setVal(user.uid)
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
        <Button disabled={loading || user !== undefined} onClick={getSignIn} variant='secondary' className="h-12 gap-2 text-base rounded-lg">
            { 
                loading  
                ? <BiLoaderAlt className='animate-spin' />
                : <BiLogoGithub />
            }
            Войти через Github
        </Button>
    )
}

export default GithubLogin