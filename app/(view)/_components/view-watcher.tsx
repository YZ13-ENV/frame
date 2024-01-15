'use client'

import { bum } from "@/api/bum"
import { DocShotData } from "@/types/shot"
import { auth } from "@/utils/app"
import { useEffect, useMemo } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

type Props = {
  shotId: string
  views: DocShotData['views']
}
const ViewWatcher = ({ views, shotId }: Props) => {
  const [user] = useAuthState(auth)
  const isViewed = useMemo(() => { return user ? views.find(view => view.uid === user.uid) : false }, [views])
  useEffect(() => {
    if (user && !isViewed) bum.shot.view(shotId, user.uid)
  }, [views, user, isViewed])
  return <></>
}

export default ViewWatcher