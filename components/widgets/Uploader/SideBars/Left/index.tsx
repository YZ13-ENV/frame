'use client'
import { useState } from 'react'
import DraftBlocks from './DraftBlocks'
import { useAuthState } from 'react-firebase-hooks/auth'
import Drafts from './Drafts'
import { auth } from '@darkmaterial/core/utils'
import { Tabs, TabsList, TabsTrigger } from '@darkmaterial/ui/shadcn'

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