'use client'
import { bum } from '@/api/bum'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { DraftForUpload } from '@/types/shot'
import { auth } from '@/utils/app'
import { useDebounceEffect } from 'ahooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiLoaderAlt } from 'react-icons/bi'

const NewDraftButton = () => {
    const { push } = useRouter()
    const [user] = useAuthState(auth)
    const [name, setName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [isExist, setIsExist] = useState<boolean>(true)
    const regEx = /[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/g
    const nameIdRegExp = /[^a-zA-Z 0-9 -]+/g
    const draftId = name
        .toLowerCase()
        .replace(nameIdRegExp,'')
        .replaceAll(' ', '-')
        .replaceAll('--', '-')

    const validName = regEx.test(name)
    const disabled = name.length === 0 || !validName || loading || isExist
    const createDraft = async() => {
        if (user) {
            setLoading(true)
            const draft: DraftForUpload = {
                attachments: [],
                authorId: user.uid,
                blocks: [],
                rootBlock: {
                    content_type: '',
                    id: '',
                    type: 'media'
                },
                thumbnail: {
                    contentType: '',
                    id: '',
                    url: ''
                },
                title: name
            }
            const res = await bum.draft.create(draftId, draft)
            if (res) {
                setLoading(false)
                push(`/uploads/shot/${draftId}`)
            }
        }
    }
    const checkName = async() => {
        const draftPromise = bum.draft.get(draftId)
        const shotPromise = bum.shot.get(draftId)
        const [draft, shot] = await Promise.all([draftPromise, shotPromise])
        const result = draft || shot
        setIsExist(!!result)
    }
    useDebounceEffect(() => {
        if (name.length !== 0 && validName) checkName()
    }, [name, validName], { wait: 1000 })
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
                        { isExist && name.length !== 0 && <span className='-mt-2 text-xs text-muted-foreground'>Уже существует</span> }
                    </div>
                    <Button onClick={createDraft} disabled={disabled} className='gap-2'>
                        { loading && <BiLoaderAlt className='animate-spin' /> }
                        Создать
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default NewDraftButton