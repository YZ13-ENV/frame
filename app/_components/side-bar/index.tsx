import { Separator } from "@/components/ui/separator";
import { getVisitorId } from "@/helpers/cookies";
import dynamic from "next/dynamic";
import { BiBriefcase, BiHome } from "react-icons/bi";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import FollowingSection from "./following-section";
import SideButton from "./side-button";
const SidebarWrapper = dynamic(() => import("./wrapper"), {
  ssr: false
})

const Sidebar = async () => {
  const visitor = getVisitorId()
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
      <FollowingSection />
    </SidebarWrapper>
  )
}

export default Sidebar