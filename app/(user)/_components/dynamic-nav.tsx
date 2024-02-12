'use client'
import { PortfolioConfig } from "@/helpers/getPortfolio"
import PortfolioTeamNav from "./nav"
// import { useRef } from "react"
import { useScroll } from "ahooks"
import { useMemo } from "react"
import Image from "next/image"

type Props = {
  user?: {
    name: string
    photoURL: string
  }
  prefix: string
  layout: PortfolioConfig['type']
}
const DynamicNav = ({ layout, prefix, user }: Props) => {
  const scroll = useScroll(document);
  const y = useMemo(() => { return scroll ? scroll.top : 0 },[scroll, scroll?.top])
  // console.log(y)
  return (
    <div className="w-full py-2 z-20 border-b sticky top-0 bg-card">
      <div className="mx-auto max-w-screen-2xl px-6 w-full flex items-center justify-start gap-2">
        {
          (y >= 340 && user) &&
          <div className="w-fit h-fit flex items-center gap-2">
            {
              user
              ? <Image src={user.photoURL} className="rounded-full" width={36} height={36} alt="photoUrl" />
              : <div className="w-9 aspect-square rounded-full bg-muted shrink-0" />
            }
            <span className="text-sm text-accent-foreground">{ user?.name }</span>
          </div>
        }
        <PortfolioTeamNav layout={layout} prefix={prefix} />
      </div>
    </div>
  )
}

export default DynamicNav