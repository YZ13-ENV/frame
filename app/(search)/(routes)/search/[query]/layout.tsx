import { file } from "@/api/file"
import SearchBar from "@/app/(search)/_components/search-bar"
import Nav from "@/app/(shots)/_components/nav"
import HeaderSkeleton from "@/components/skeletons/header"
import dynamic from "next/dynamic"
import Image from "next/image"

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
  const grid = await file.static.get('gird.svg')
  return (
    <>
      <Header />
      {
          grid &&
          <>
              <div className='w-full h-full z-[-1] max-h-screen absolute -top-[60px] left-0 bg-gradient-to-b from-transparent to-background' />
              <Image src={grid} fill className='z-[-2] max-h-screen absolute !-top-[60px] left-0 object-cover opacity-40' alt='grid' />
          </>
      }
      <div className="w-full h-64 flex flex-col mt-12 items-center justify-center">
        <div className="max-w-md w-full px-6 flex flex-col items-center justify-center gap-4">
          <SearchBar defaultValue={decodeURIComponent(params.query)} />
          <span className="text-xs text-center text-muted-foreground">
            Начните вводить запрос и как закончите, вас автоматически переведет на страницу с результатами
          </span>
        </div>
      </div>
      <div className="min-h-screen w-full relative py-12 lg:px-24 md:px-12 px-6">
        <Nav />
        <div className="w-full h-full z-20 grid shots_grid gap-6">
          { children }
        </div>
      </div>
    </>
  )
}

export default layout