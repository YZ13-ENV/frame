import ShotCard from "@/components/shared/shot-card"
import { Button } from "@/components/ui/button"
import { bum, user } from "@darkmaterial/api"
import Image from "next/image"
import Link from "next/link"

type Props = {
  memberId: string
}
const MemberCard = async ({ memberId }: Props) => {
  const member = await user.byId.short(memberId)
  const last = await bum.author.last(memberId)
  const link = member && member.nickname ? `/${member.nickname}` : `/${memberId}`
  return (
    <div className="w-full flex flex-col gap-4 fit rounded-lg border p-4">
      <div className="w-full h-12 flex items-center gap-2 justify-between">
        <div className="w-fit h-fit flex items-center gap-2">
          {
            !!member?.photoUrl
              ? <Image src={member?.photoUrl || ''} className="rounded-full" width={36} height={36} alt='member-avatar' />
              : <div className="w-9 shrink-0 aspect-square rounded-full bg-muted" />
          }
          <div className="w-full h-full flex flex-col justify-center">
            <span className="text-lg font-semibold">{member?.displayName}</span>
            <span className="text-sm text-muted-foreground">{member?.position || member?.email}</span>
          </div>
        </div>
        <Button asChild><Link href={link}>Перейти</Link></Button>
      </div>
      <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
        {
          !!last.length
            ? last.map(shot => <ShotCard key={shot.doc_id} shot={shot} enableFooter={false} />)
            : <div className="col-span-full aspect-[4/3] row-span-full flex items-center justify-center">
              <span className="text-sm text-muted-foreground text-center">Ещё нет опубликованных работ</span>
            </div>
        }
      </div>
    </div>
  )
}

export default MemberCard