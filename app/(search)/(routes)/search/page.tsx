import HeaderSkeleton from "@/components/skeletons/header"
import dynamic from "next/dynamic"
import SearchBar from "../../_components/search-bar"
import MenuButton from "@/app/_components/menu-button"
import Sidebar from "@/app/_components/side-bar"
const Header = dynamic(() => import("@/components/widgets/header"), {
  loading: () => <HeaderSkeleton />
})

const page = async () => {
  return (
    <>
      <Header menu={<MenuButton />} />
      <div style={{ height: 'calc(100vh - 56px)' }} className="flex">
        <Sidebar />
        <section className="w-full h-full flex flex-col items-center justify-center">
          <div className="max-w-md w-full px-6 flex flex-col items-center justify-center gap-4">
            <SearchBar />
            <span className="text-xs text-center text-muted-foreground">
              Начните вводить запрос и как закончите, вас автоматически переведет на страницу с результатами
            </span>
          </div>
        </section>
      </div>
    </>
  )
}

export default page