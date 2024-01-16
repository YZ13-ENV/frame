'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PiBellBold } from "react-icons/pi";

const Notifications = () => {
    return (
      <Popover open={true}>
        <PopoverTrigger className='w-9 h-9 rounded-full flex items-center justify-center border bg-background'><PiBellBold size={16} /></PopoverTrigger>
        <PopoverContent className='rounded-xl w-80 p-0 flex flex-col'>
          <div className="w-full border-b p-4 flex items-center">
            <span className='text-base font-semibold'>Уведомления</span>
          </div>
          <div className="w-full h-full flex flex-col">

            <div className="w-full h-fit flex flex-col p-4 border-b">
              <span className='text-base font-semibold'>Новое уведомление</span>
              <span className='text-xs text-muted-foreground'>5 минут назад</span>
              <span className='text-sm text-muted-foreground mt-2'>Вот и описание к этому уведомлению</span>
            </div>

            <div className="w-full h-fit flex flex-col p-4">
              <span className='text-base font-semibold'>Новое уведомление</span>
              <span className='text-xs text-muted-foreground'>5 минут назад</span>
              <span className='text-sm text-muted-foreground mt-2'>Вот и описание к этому уведомлению</span>
            </div>

          </div>
        </PopoverContent>
      </Popover>
    )
}

export default Notifications