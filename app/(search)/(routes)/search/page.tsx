import HeaderSkeleton from "@/components/skeletons/header"
import dynamic from "next/dynamic"
import SearchBar from "../../_components/search-bar"
const Header = dynamic(() => import( "@/components/widgets/header"), {
  loading: () => <HeaderSkeleton />
})

const page = async() => {
  return (
    <>
      <Header />
      <section style={{ height: 'calc(100vh - 64px)' }} className="flex flex-col items-center justify-center">
        <div className="max-w-md w-full px-6 flex flex-col items-center justify-center gap-4">
          <SearchBar />
          <span className="text-xs text-center text-muted-foreground">
            Начните вводить запрос и как закончите, вас автоматически переведет на страницу с результатами
          </span>
        </div>
      </section>
    </>
  )
}

export default page