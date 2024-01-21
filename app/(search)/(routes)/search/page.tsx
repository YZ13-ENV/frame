import { file } from "@/api/file"
import HeaderSkeleton from "@/components/skeletons/header"
import dynamic from "next/dynamic"
import Image from "next/image"
import SearchBar from "../../_components/search-bar"

const Header = dynamic(() => import( "@/components/widgets/header"), {
  loading: () => <HeaderSkeleton />
})

const page = async() => {
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