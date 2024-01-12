'use client'
import { bum } from '@/api/bum'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { DraftForUpload } from '@/types/shot'
import { auth } from '@/utils/app'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const NewDraftButton = () => {
    const { push } = useRouter()
    const [user] = useAuthState(auth)
    const [name, setName] = useState<string>('')
    const regEx = /[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/g
    const nameIdRegExp = /[^a-zA-Z 0-9 -]+/g
    const draftId = name
        .toLowerCase()
        .replace(nameIdRegExp,'')
        .replaceAll(' ', '-')
        .replaceAll('--', '-')

    const validName = regEx.test(name)
    const createDraft = async() => {
        if (user) { 
            const draft: DraftForUpload = {
                attachments: [],
                authorId: user.uid,
                blocks: [],
                rootBlock: {
                    content_type: '',
                    id: '0',
                    type: 'media'
                },
                thumbnail: {
                    contentType: '',
                    id: '0',
                    url: ''
                },
                title: name
            }
            const res = await bum.draft.create(draftId, draft)
            if (res) {
                push(`/uploads/shot/${draftId}`)
            }
        }
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button disabled={!user}>Создать черновик</Button>
            </DrawerTrigger>
            <DrawerContent className='max-w-sm mx-auto w-full'>
                <div className="p-6 w-full flex flex-col gap-6">
                    <div className="w-full h-fit flex flex-col gap-4">
                        <span className='text-xl font-semibold'>Новый черновик</span>
                        <span className='text-sm text-muted-foreground'>Укажите название черновика, по нему вы сможете найти свой черновик, после создания черновика название изменить нельзя.</span>
                        <Input placeholder='Название черновика' value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <Button onClick={createDraft} disabled={!validName}>Создать</Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default NewDraftButton