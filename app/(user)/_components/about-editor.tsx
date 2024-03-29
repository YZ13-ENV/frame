'use client'
import { Button } from "@/components/ui/button"
import { bum } from "@darkmaterial/api"
import { Textarea } from "@darkmaterial/ui"
import { useState } from "react"

type Props = {
    authorId: string
    defaultValue?: string
}
const AboutEditor = ({ authorId, defaultValue = '' }: Props) => {
    const [about, setAbout] = useState<string>(defaultValue)
    const [debouncedValue, setDebouncedValue] = useState<string>(defaultValue)
    const syncAbout = async () => {
        const syncedValue = await bum.author.addAbout(authorId, about)
        setAbout(syncedValue)
        setDebouncedValue(syncedValue)
    }
    return (
        <>
            <Textarea value={about} onChange={e => setAbout(e.target.value)}
                placeholder="Расскажите о себе" />
            {
                about !== debouncedValue &&
                <div className="w-full h-fit flex items-center justify-end">
                    <Button onClick={syncAbout}>Сохранить</Button>
                </div>
            }
        </>
    )
}

export default AboutEditor