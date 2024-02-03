import SearchBar from "@/app/(search)/_components/search-bar"
import Nav from "@/app/(shots)/_components/nav"
import HeaderSkeleton from "@/components/skeletons/header"
import dynamic from "next/dynamic"

const Header = dynamic(() => import( "@/components/widgets/header"), {
  loading: () => <HeaderSkeleton />
})

type Props = {
  params: {
    query: string
  }
  children: JSX.Element | JSX.Element[]
}
const layout = async({ params, children }: Props) => {
  return (
    <>
      <Header />
      <div className="w-full h-fit px-6 py-2 flex items-center justify-center border-b">
          <Nav padding={false} />
      </div>
      <div className="w-full h-fit flex flex-col mt-12 items-center justify-center">
        <div className="max-w-md w-full px-6 flex flex-col items-center justify-center gap-4">
          <SearchBar defaultValue={decodeURIComponent(params.query)} />
        </div>
      </div>
      <div className="min-h-screen w-full relative py-12 lg:px-24 md:px-12 px-6">
        <div className="w-full h-full z-20 grid shots_grid gap-6">
          { children }
        </div>
      </div>
    </>
  )
}

export default layout