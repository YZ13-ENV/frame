'use client'
import { useState } from 'react'
import DraftBlocks from './draft-blocks'
import { useAuthState } from 'react-firebase-hooks/auth'
import Drafts from './drafts'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auth } from '@/utils/app'

const LeftSidebar = () => {
    const [user] = useAuthState(auth)
    const [tab, setTab] = useState<'blocks' | 'drafts'>('blocks')
    return (
        <>
            <Tabs defaultValue="blocks" value={tab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger onClick={() => setTab('blocks')} value="blocks">Добавленные блоки</TabsTrigger>
                    <TabsTrigger onClick={() => setTab('drafts')} value="drafts">Черновики</TabsTrigger>
                </TabsList>
            </Tabs>
            {
                tab === 'blocks'
                ? <DraftBlocks />
                : user
                ? <Drafts uid={user.uid} />
                : 'need active user'
            }
        </>
    )
}

export default LeftSidebar