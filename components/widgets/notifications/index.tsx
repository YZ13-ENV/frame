'use client'
import { notifications } from '@/api/notifications';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DocNotification } from '@/types/notifications';
import { auth } from '@/utils/app';
import { useInterval } from 'ahooks';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PiBellBold } from "react-icons/pi";
import Notification from './notification';

const Notifications = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [user] = useAuthState(auth)
    const [received, setReceived] = useState<DocNotification[]>([])
    const hasNoViewed = received.filter(notification => !notification.isViewed)
    // useEffect(() => {
    //   if (user) notifications.all(user.uid)
    //   .then(notifications => setReceived(notifications))
    // },[user, open])
    useInterval(() => {
      if (user) notifications.all(user.uid)
      .then(notifications => setReceived(notifications))
    }, user ? open ? 1000 : 5000 : undefined)
    if (!user) return null
    return (
      <Popover open={user ? open : false} onOpenChange={state => setOpen(state)}>
        <PopoverTrigger className='relative w-9 h-9 rounded-full flex items-center justify-center border bg-background'>
          { hasNoViewed.length !== 0 && <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-primary" /> }
          <PiBellBold size={16} />
        </PopoverTrigger>
        <PopoverContent className='rounded-xl w-80 p-0 flex flex-col'>
          <div className="w-full border-b px-4 py-2 flex items-center">
            <span className='text-base font-semibold'>Уведомления</span>
          </div>
          <div className="w-full h-full flex flex-col">
            {
              !received.length
              ? <div className='w-full h-64 flex items-center justify-center'>
                <span className='text-center text-sm text-muted-foreground'>Нет новых уведомлений</span>
              </div>
              : received.map(notification => <Notification key={notification.doc_id} notification={notification} /> )
            }
          </div>
        </PopoverContent>
      </Popover>
    )
}

export default Notifications