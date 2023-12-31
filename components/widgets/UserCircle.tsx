'use client'

import { useMediaQuery } from "react-responsive"
import { UserSection } from "../entities/user"
import { MobileMenu } from "./MobileMenu"

// import {} from 'react'

type Props = {
    signLink?: string
    profileLink?: string
    haveDashboard?: boolean
}
const UserCircle = ({ haveDashboard=false, profileLink, signLink }: Props) => {
    const signInLink = signLink || 'https://darkmaterial.space/auth/signin'
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 786px)' })
    if (!isTabletOrMobile) return <UserSection haveDashboard={haveDashboard} signLink={signInLink} profileLink={profileLink} />
    return <MobileMenu haveDashboard={haveDashboard} signLink={signInLink} profileLink={profileLink} />
}

export { UserCircle }