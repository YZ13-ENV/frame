import SearchBar from "@/app/(search)/_components/search-bar"
import Nav from "@/app/(shots)/_components/nav"
import ShotsWrapper from "@/app/(shots)/_components/shots-wrapper"
import MenuButton from "@/app/_components/menu-button"
import Sidebar from "@/app/_components/side-bar"
import Footer from "@/components/shared/footer"
import HeaderSkeleton from "@/components/skeletons/header"
import dynamic from "next/dynamic"

const Header = dynamic(() => import("@/components/widgets/header"), {
  loading: () => <HeaderSkeleton />
})

type Props = {
  params: {
    query: string
  }
  children: JSX.Element | JSX.Element[]
}
const layout = ({ params, children }: Props) => {
  return (
    <>
      <Header menu={<MenuButton />} />
      <div style={{ height: "calc(100dvh - 56px)" }} className="w-fill relative flex">
        <Sidebar />
        <div className="w-full h-full overflow-y-auto">
          <div className="w-full h-fit px-6 py-2 flex items-center justify-center">
            <Nav padding={false} />
          </div>
          <div className="w-full h-fit flex flex-col mt-12 items-center justify-center">
            <div className="max-w-md w-full px-6 flex flex-col items-center justify-center gap-4">
              <SearchBar defaultValue={decodeURIComponent(params.query)} />
            </div>
          </div>
          <ShotsWrapper>
            <div className="w-full h-full z-20 grid shots_grid gap-6">
              {children}
            </div>
          </ShotsWrapper>
          <Footer className="lg:px-24 md:px-12 px-6 py-6" />
        </div>
      </div>

    </>
  )
}

export default layout