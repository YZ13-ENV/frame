import { getVisitorId } from "@/helpers/cookies"
import { bum } from "api"
import { Suspense } from "react"
import FollowerButton from "./follower-button"

const FollowingSection = async () => {
  const visitor = getVisitorId()
  const followings = visitor ? await bum.author.followings(visitor) : []
  const SubLoader = () => {
    return (
      <div className="w-full h-64 p-4 flex flex-col gap-2">
        <div className="w-full h-10 rounded-md bg-muted animate-pulse" />
        <div className="w-full h-10 rounded-md bg-muted animate-pulse" />
        <div className="w-full h-10 rounded-md bg-muted animate-pulse" />
      </div>
    )
  }
  if (!visitor || followings.length === 0) return null
  return (
    <Suspense fallback={<SubLoader />}>
      <div className="w-full flex flex-col p-4">
        <span className="font-medium mb-4">Подписки</span>
        {
          followings.map(user => <FollowerButton key={user + "-following"} uid={user} />)
        }
      </div>
    </Suspense>
  )
}

export default FollowingSection