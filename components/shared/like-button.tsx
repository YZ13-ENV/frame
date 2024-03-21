'use client'
import { auth } from "@/utils/app"
import { bum, team } from "@darkmaterial/api"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { BiHeart } from "react-icons/bi"
import { BsFillHeartFill } from "react-icons/bs"
import { Button } from "../ui/button"

type Props = {
  id: string
  defaultValue?: boolean
  teamId?: string
}
const LikeButton = ({ id, teamId, defaultValue = false }: Props) => {
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(defaultValue)
  const disabled = !id || loading || !user
  const onClick = async () => {
    if (user) {
      setLoading(true)
      const likes = teamId ? await team.shot.like(teamId, id, user.uid) : await bum.shot.like(id, user.uid)
      const isNowLikes = !!likes.find(like => like.uid === user.uid)
      setIsLiked(isNowLikes)
      setLoading(false)
    }
  }
  return (
    <Button
      variant={isLiked ? "default" : "secondary"}
      size={isLiked ? "icon" : "default"}
      disabled={disabled} onClick={onClick}
      className="rounded-full gap-2"
    >
      {
        isLiked
          ? <BsFillHeartFill />
          : <BiHeart size={16} />
      }
      {isLiked ? null : "Нравится"}

    </Button>
  )
}

export default LikeButton