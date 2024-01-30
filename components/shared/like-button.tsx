'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { BiHeart, BiLoaderAlt, BiSolidHeart } from "react-icons/bi"
import { bum } from "@/api/bum"
import { team } from "api"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/app"

type Props = {
  id: string
  defaultValue?: boolean
  teamId?: string
}
const LikeButton = ({ id, teamId, defaultValue=false }: Props) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const [isLiked, setIsLiked] = useState<boolean>(defaultValue)
    const disabled = !id || loading || !user
    const onClick = async() => {
      if (user) {
        setLoading(true)
        const likes = teamId ? await team.shot.like(teamId, id, user.uid) : await bum.shot.like(id, user.uid)
        const isNowLikes = !!likes.find(like => like.uid === user.uid)
        setIsLiked(isNowLikes)
        setLoading(false)
      }
    }
    return (
      <Button size='icon' variant={isLiked ? 'default' : 'outline'} disabled={disabled} onClick={onClick}>
        {
          loading
          ? <BiLoaderAlt className='animate-spin' />
          : isLiked
          ? <BiSolidHeart />
          : <BiHeart />
        }
      </Button>
    )
}

export default LikeButton