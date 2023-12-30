'use client'

import { auth } from "@darkmaterial/core/utils"
import { UserCircle } from "@darkmaterial/ui/widgets"
import { useAuthState } from "react-firebase-hooks/auth"

const UserButton = () => {
    const [user] = useAuthState(auth)
    return (
        <div className={`flex items-center justify-center h-12 bg-card border cursor-pointer ${ user ? 'w-12' : 'w-fit px-1' }  shrink-0 rounded-xl border`}>
            <UserCircle profileLink={user ? `/${user.displayName}` : '/profile'} signLink="https://darkmaterial.space/auth/signin?back_url=https://bum.darkmaterial.space/shots"  />
        </div>
    )
}

export default UserButton