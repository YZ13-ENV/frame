import { bum } from "@/api/bum"
import Loading from "@/app/(shots)/(routes)/shots/[order]/loading"
import Link from "next/link"
import { Suspense } from "react"
import { BiRightArrowAlt } from "react-icons/bi"
import AdvancedChunk from "../widgets/chunk"
import { Button } from "../ui/button"

const ShotsExample = () => {
  return (
    <div className="w-full p-6 min-h-[75vh] rounded-t-2xl border-t border-x bg-card max-w-screen-2xl mx-auto relative">
        <div className="w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute left-0 z-40 bottom-0 w-full h-1/4 flex items-center justify-center">
            <Button className='gap-2' asChild>
                <Link href='/shots/popular' className='gap-2'>
                    Продолжить просмотр
                    <BiRightArrowAlt size={18} />
                </Link>
            </Button>
        </div>
        <Suspense fallback={ <Loading /> }>
            <div className="w-full h-full grid shots_grid gap-6">
                <AdvancedChunk hideController getter={ bum.shots.all } order={'popular'} />
            </div>
        </Suspense>
    </div>
  )
}

export default ShotsExample