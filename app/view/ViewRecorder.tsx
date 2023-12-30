'use client'
import { addDoc, and, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { DateTime } from 'luxon'
import { db, auth } from '@darkmaterial/core/utils'
import type { DocShotData } from '@darkmaterial/core/types'
import { host } from '@darkmaterial/core/const'

type Props = {
    shot: DocShotData
}
const ViewRecorder = ({ shot }: Props) => {
    const [user, loading] = useAuthState(auth)
    const addViews = async() => {
        if (user) {
            await fetch(`${host}/shots/addView?shotAuthorId=${shot.authorId}&shotId=${shot.doc_id}&uid=${user.uid}`, {
                method: 'PATCH'
            })
        }
    }
    const findIfExist = async( authorId: string, shotId: string ) => {
        if (user) {
            const collToSearch = collection(db, 'users', user.uid, 'history', 'views', 'dey')
            const q = query(collToSearch, and(where('authorId', '==', authorId), where('shotId', '==', shotId)))
            const snaps = await getDocs(q)
            if (snaps.empty) {
                return null
            } else {
                const pickedSnap = snaps.docs[0]
                const existedView = {
                    historyId: pickedSnap.id,
                    ...pickedSnap.data()
                }
                return existedView
            }
        }
    }
    const addToHistory = async() => {
        if (user) {
            const alreadyInHistory = await findIfExist(shot.authorId, shot.doc_id)
            const preparedHistoryUnit = {
                createdAt: DateTime.now().toSeconds(),
                authorId: shot.authorId,
                shotId: shot.doc_id
            }
            if (alreadyInHistory) {
                const docToUpdate = doc(db, 'users', user.uid, 'history', 'views', 'dey', alreadyInHistory.historyId)
                await updateDoc(docToUpdate, preparedHistoryUnit)
            } else {
                const collToAdd = collection(db, 'users', user.uid, 'history', 'views', 'dey')
                await addDoc(collToAdd, preparedHistoryUnit)
            }
        }
    }
    useEffect(() => {
        if (user && process.env.NODE_ENV !== 'development') addViews()
        if (user && !loading) addToHistory()
    },[user, loading])
    return (
        <></>
    )
}

export default ViewRecorder