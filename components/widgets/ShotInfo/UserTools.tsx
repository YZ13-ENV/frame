'use client'
import { ReactNode } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from 'next/navigation'
import LikeButton from './LikeButton'
import { auth } from '@darkmaterial/core/utils'
import { host } from '@darkmaterial/core/const'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@darkmaterial/ui/shadcn'
// import FollowButton from "../Dock/ui/FollowButton"

type Props = {
    uid: string
    shotId: string
}
const UserTools = ({ shotId, uid }: Props) => {
    const [user] = useAuthState(auth)
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <LikeButton authorId={uid} doc_id={shotId} />
            { user ? user.uid === uid && <ShotDropdown shotId={shotId} /> : null }
            {/* { user && (uid === user.uid) && <DeleteButton shotId={shotId} /> } */}
        </div>
    )
}

const ShotDropdown = ({ shotId }: { shotId: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size='icon' className='rounded-xl'><BiDotsVerticalRounded size={18} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl">
                <DeleteButton shotId={shotId}>
                    <DropdownMenuItem>
                        Удалить
                    </DropdownMenuItem>
                </DeleteButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const DeleteButton = ({ shotId, children }: { shotId: string, children: ReactNode }) => {
    const [user] = useAuthState(auth)
    const router = useRouter()
    const deleteShot = async() => {
        if (user) {
            const res = await fetch(`${host}/shots/shot/${shotId}/${user.uid}`, { method: "DELETE" })
            if (res.ok) router.push('/')
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                { children }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Ваша работа будет удалена, без возможности восстановления, после вы будете перенесены главную страницу.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteShot}>Удалить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default UserTools