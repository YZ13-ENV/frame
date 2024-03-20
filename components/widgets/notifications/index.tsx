'use client'
import { auth } from '@/utils/app'
import { Notifications } from "@darkmaterial/ui"
import { memo } from 'react'


const NotificationsWrapper = () => {
    return <Notifications auth={auth} />
}

export default memo(NotificationsWrapper)