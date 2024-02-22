import { Separator } from "@/components/ui/separator";
import { bum } from "api";
import { BiHome, BiBriefcase } from "react-icons/bi"
import { LuGalleryVerticalEnd } from "react-icons/lu";
import FollowerButton from "./follower-button";
import SidebarWrapper from "./wrapper";
import { getVisitorId } from "@/helpers/cookies";
import SideButton from "./side-button";
import { Suspense } from "react";

const SubLoader = () => {
  return (
    <div className="w-full h-64 p-4 flex flex-col gap-2">
      <div className="w-full h-10 rounded-md bg-muted animate-pulse" />
      <div className="w-full h-10 rounded-md bg-muted animate-pulse" />
      <div className="w-full h-10 rounded-md bg-muted animate-pulse" />
    </div>
  )
}
const Sidebar = async () => {
  const visitor = getVisitorId()
  const followings = visitor ? await bum.author.followings(visitor) : []
  const rootLink = visitor ? "/shots/following" : "/shots/popular"
  return (
    <SidebarWrapper>
      <div className="w-full p-4 flex flex-col">
        <SideButton
          icon={BiHome}
          label="Главная"
          link={rootLink}
        />
        {
          visitor &&
          <>
            <SideButton
              icon={BiBriefcase}
              label="Портфолио"
              link={`/${visitor}`}
            />
            <SideButton
              icon={LuGalleryVerticalEnd}
              label="Подписки"
              link="/shots/following"
            />
          </>
        }
      </div>
      <div className="w-full px-2">
        <Separator />
      </div>
      {
        visitor &&
        <Suspense fallback={<SubLoader />}>
          <div className="w-full flex flex-col p-4">
            <span className="font-medium mb-4">Подписки</span>
            {
              followings.map(user => <FollowerButton key={user + "-following"} uid={user} />)
            }
          </div>
        </Suspense>
      }
    </SidebarWrapper>
  )
}

export default Sidebar