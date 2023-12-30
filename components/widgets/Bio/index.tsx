'use client'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import About from './ui/About'
// import Skills from './ui/Skills'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { isEqual } from 'lodash'
import { useDebounceEffect } from 'ahooks'
import { auth, db } from '@darkmaterial/core/utils'
import { userAPI } from '@darkmaterial/api'
import { Button } from '@darkmaterial/ui/shadcn'

type Props = {
    uid: string
}
const Bio = ({ uid }: Props) => {
    const [user] = useAuthState(auth)
    const [about, setAbout] = useState<string>('')
    const [skills, setSkills] = useState<string[]>([])
    const bioDoc = useMemo(() => ({
        about: about,
        skills: skills
    }), [about, skills])
    const updatedBio = async() => {
        if (user) {
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const bioField = docSnap.get('bio')
                console.log(bioField)
                if (!bioField) {
                    const bio = bioDoc
                    const entireDoc = { ...docSnap.data(), bio }
                    await updateDoc(docRef, entireDoc)
                } else if (!isEqual(bioField, bioDoc)) {
                    const bio = bioDoc
                    const entireDoc = { ...docSnap.data(), bio }
                    await updateDoc(docRef, entireDoc)
                }
            } else {
                const bio = bioDoc
                await setDoc(docRef, { bio })
            }

        }
    }
    const getBio = async() => {
        const user = await userAPI.byNickname.short(uid)
        if (user) {
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const bioField = docSnap.get('bio')
                console.log(bioField)
                if (bioField) {
                    setAbout(bioField.about)
                    setSkills(bioField.skills)
                }
            }
        }
    }
    useLayoutEffect(() => {
        getBio()
    },[uid, user])
    useDebounceEffect(() => {
        if (user && user.displayName === uid) {
            if (about !== '' || skills.length !==0) updatedBio()
        } 
    },[user, about, skills], { wait: 2000 })
    return (
        <>
            <div className="flex flex-col w-full gap-2 h-fit md:w-2/3">
                <About preparedValue={ user && user.displayName === uid ? true : false } about={about} setAbout={setAbout} />
                {/* <Skills preparedValue={ user && user.displayName === uid ? true : false } skills={skills} setSkills={setSkills} /> */}
            </div>
            <div className="flex flex-col w-full h-fit md:w-1/3">
                <div className="flex flex-col w-full gap-2 h-fit">
                    <span className="font-medium text-neutral-200">Соц. сети</span>
                    <Button disabled >Временно недоступно</Button>
                </div>
            </div>
        </>
    )
}

export default Bio