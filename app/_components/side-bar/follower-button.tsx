import { getPortfolio } from "@/helpers/getPortfolio"
import Image from "next/image"
import Link from "next/link"

type Props = {
  uid: string
}
const FollowerButton = async ({ uid }: Props) => {
  const follower = await getPortfolio(uid)
  if (!follower) return null
  if (follower.type === 'user' && follower.data) return (
    <div className="relative w-full px-2 h-10 flex items-center gap-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
      <Link href={`/${follower.data.uid}`} className="absolute w-full h-full left-0 top-0" />
      <div className="w-6 aspect-square relative">
        {
          follower.data.photoUrl
            ? <Image className="rounded-full border" src={follower.data.photoUrl} width={24} height={24} alt='profile-photo' />
            : <div className="w-full border h-full rounded-full bg-muted" />
        }
      </div>
      <span className="text-sm font-medium">{follower.data.nickname || follower.data.displayName}</span>
    </div>
  )
  if (follower.type === 'team' && follower.data) return (
    <div className="relative w-full px-2 h-10 flex items-center gap-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
      <Link href={`/${follower.data.doc_id}`} className="absolute w-full h-full left-0 top-0" />
      <div className="w-6 aspect-square relative">
        {
          follower.data.photoURL
            ? <Image className="rounded-full border" src={follower.data.photoURL} width={24} height={24} alt='profile-photo' />
            : <div className="w-full border h-full rounded-full bg-muted" />
        }
      </div>
      <span className="text-sm font-medium">{follower.data.name}</span>
    </div>
  )
}

export default FollowerButton