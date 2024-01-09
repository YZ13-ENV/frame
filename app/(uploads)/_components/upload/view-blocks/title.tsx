'use client'

import { useAppDispatch, useAppSelector } from "@/components/entities/store/store"
import { setTitle } from "@/components/entities/uploader/draft"
import { Input } from "@/components/ui/input"

const Title = () => {
    const draft = useAppSelector(state => state.uploader.draft.draft)
    const dispatch = useAppDispatch()
    return (
        <Input className='text-2xl font-semibold md:text-4xl text-accent-foreground !border-0 !ring-0 !outline-none bg-transparent text-center h-fit'
        value={draft.title} onChange={e => dispatch(setTitle(e.target.value))} />
    )
}

export default Title