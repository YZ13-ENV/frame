'use client'

import { DocNotification } from "@/types/notifications"
import { DateTime } from "luxon"
import { useInViewport } from 'ahooks'
import { memo, useEffect, useRef } from "react"
import { notifications } from "@/api/notifications"
import { Button } from "@/components/ui/button"
import { BiTrashAlt } from "react-icons/bi"

type Props = {
  notification: DocNotification
}
const Notification = ({ notification }: Props) => {
    const ref = useRef(null)
    const [isInView] = useInViewport(ref)
    useEffect(() => {
      if (!notification.isViewed && isInView)
      notifications.patch(notification.receiver, notification.doc_id, { isViewed: true })
    },[notification.isViewed, isInView])
    return (
      <div ref={ref} className="w-full h-fit flex flex-col p-4 border-b">
        <div className="w-full h-fit flex items-start justify-between">
          <div className="w-fit h-fit flex flex-col">
            <span className='text-base font-semibold'>{notification.title}</span>
            <span className='text-xs text-muted-foreground'>{DateTime.fromSeconds(notification.createdAt).setLocale('ru').toRelative()}</span>
          </div>
          <Button size='icon' variant='destructive' onClick={() => notifications.delete(notification.receiver, notification.doc_id)}><BiTrashAlt /></Button>
        </div>
        <span className='text-sm text-muted-foreground mt-2'>{notification.description}</span>
      </div>
    )
}

export default memo(Notification)