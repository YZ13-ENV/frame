'use client'
import { bum, DraftForUpload } from 'api'
import type { ShortUserData } from 'api'
import { team, user as userAPI } from 'api'
import { auth } from '@/utils/app'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useDebounceEffect } from 'ahooks'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiLoaderAlt } from 'react-icons/bi'

const NewDraftButton = () => {
    const { push } = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const [user] = useAuthState(auth)
    const [extra, setExtra] = useState<ShortUserData | null>(null)
    const [forWho, setForWho] = useState<'me' | 'team'>('me')
    const [name, setName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [isExist, setIsExist] = useState<boolean>(true)
    const hasTeam = extra ? !!extra.teamId : false
    const regEx = /[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/g
    const nameIdRegExp = /[^a-zA-Z 0-9 -]+/g
    const draftId = name
        .toLowerCase()
        .replace(nameIdRegExp, '')
        .replaceAll(' ', '-')
        .replaceAll('--', '-')

    const validName = regEx.test(name)
    const disabled = name.length === 0 || !validName || loading || isExist
    const createDraft = async () => {
        if (hasTeam) {
            if (user && extra && extra.teamId) {
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
                const res = await team.draft.create(extra.teamId, draftId, draft)
                if (res) {
                    setLoading(false)
                    push(`/uploads/${extra.teamId}/${draftId}`)
                }
            }
        } else {
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

    }
    const checkName = async () => {
        if (extra && extra.teamId) {
            const draftPromise = hasTeam ? team.draft.get(extra.teamId, draftId) : bum.draft.get(draftId)
            const shotPromise = hasTeam ? team.shot.get(extra.teamId, draftId) : bum.shot.get(draftId)
            const [draft, shot] = await Promise.all([draftPromise, shotPromise])
            const result = draft || shot
            setIsExist(!!result)
        }
    }
    useDebounceEffect(() => {
        if (name.length !== 0 && validName) checkName()
    }, [name, validName, forWho], { wait: 1000 })
    useEffect(() => {
        if (user && open) {
            userAPI.byId.short(user.uid)
                .then(data => setExtra(data))
        }
    }, [user, open])
    return (
        <Drawer open={open} onOpenChange={state => setOpen(state)}>
            <DrawerTrigger asChild>
                <Button disabled={!user}>Создать черновик</Button>
            </DrawerTrigger>
            <DrawerContent className='max-w-sm mx-auto w-full'>
                <div className="p-6 w-full flex flex-col gap-6">
                    <div className="w-full h-fit flex flex-col gap-4">
                        <span className='text-xl font-semibold'>Новый черновик</span>
                        <span className='text-sm text-muted-foreground'>Укажите название черновика, по нему вы сможете найти свой черновик, после создания черновика название изменить нельзя.</span>
                        <Input placeholder='Название черновика' value={name} onChange={e => setName(e.target.value)} />
                        {isExist && name.length !== 0 && <span className='-mt-2 text-xs text-muted-foreground'>Уже существует</span>}
                    </div>
                    {
                        hasTeam &&
                        <div className='w-full h-fit flex flex-col gap-2'>
                            <Select value={forWho} onValueChange={state => setForWho(state as 'me' || 'team')}>
                                <SelectTrigger>{forWho === 'me' ? 'Для себя' : 'Для команды'}</SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='me'>Для себя</SelectItem>
                                    <SelectItem value='team'>Для команды</SelectItem>
                                </SelectContent>
                            </Select>
                            {
                                forWho === 'team' && <span className='text-xs text-muted-foreground'>
                                    Вы создадите черновик для команды
                                </span>
                            }
                        </div>
                    }
                    <Button onClick={createDraft} disabled={disabled} className='gap-2'>
                        {loading && <BiLoaderAlt className='animate-spin' />}
                        Создать
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default NewDraftButton