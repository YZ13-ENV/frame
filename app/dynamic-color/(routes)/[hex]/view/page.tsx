import BlurRootBlock from "@/app/dynamic-color/_components/dynamic-color/blur-root-block"
import { Button } from "@/app/dynamic-color/_components/dynamic-color/button"
import Div from "@/app/dynamic-color/_components/dynamic-color/div"
import H from "@/app/dynamic-color/_components/dynamic-color/h"
import Span from "@/app/dynamic-color/_components/dynamic-color/span"
import { getDynamicColors } from "@/helpers/colors"
import { redirect } from "next/navigation"

type Props = {
  params: {
    hex: string
  }
  searchParams: {
    lightness: string
  }
}
const page = ({ params, searchParams }: Props) => {
  const { hex } = params
  if (hex.length > 6) return redirect("/test")
  const lightness = searchParams.lightness ? parseInt(searchParams.lightness) : .5
  const validHEX = `#${hex}`
  const { isLightColor, original, ui } = getDynamicColors(
    validHEX, { lightness: lightness }
  )
  return (
    <Div variables={ui} className="w-full min-h-screen pt-10 bg-background-dynamic/10">
      <BlurRootBlock className="bg-primary-dynamic" />
      {/* blur */}
      <div className="relative max-w-7xl mx-auto w-full min-h-screen flex items-start gap-6 px-6">

        <div className="w-full space-y-6 py-6">
          <div className="max-w-5xl w-full mx-auto flex flex-col gap-2">
            <H size={1} variables={ui} className="w-1/3 h-7 rounded-md bg-primary-dynamic" />
            <div className='w-full flex items-center justify-between'>
              <Span variables={ui} className="w-1/4 h-4 rounded-sm bg-muted-dynamic" />
              <div className='flex items-center gap-2'>
                <Button className="w-24 rounded-full" variant="secondary" variables={ui}></Button>
                <Button className="w-36 rounded-full" variant="secondary" variables={ui}></Button>
              </div>
            </div>
          </div>
          <div id="overview" className="max-w-5xl w-full mx-auto flex flex-col gap-2">
            <Div variables={ui} className="w-full aspect-video bg-primary-dynamic rounded-xl" />
          </div>
          <div className="max-w-5xl w-full mx-auto flex flex-col gap-2">
            <div className="w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Div variables={ui} className="h-9 aspect-square rounded-full bg-primary-dynamic" />
                <div className="h-fit flex flex-col justify-center gap-1">
                  <Span variables={ui} className='w-36 h-5 rounded-sm bg-primary-dynamic' />
                  <Span variables={ui} className='w-24 h-4 rounded-sm bg-muted-dynamic' />
                </div>
                <Button className="w-36 rounded-full" variables={ui}></Button>
              </div>
              <div className="flex items-center gap-2">
                <Button className="w-24 rounded-full" variant="secondary" variables={ui}></Button>
                <Button className="w-36 rounded-full" variant="secondary" variables={ui}></Button>
              </div>
            </div>
          </div>
          <div className="max-w-5xl w-full mx-auto flex flex-col gap-2 py-12">
            <Div variables={ui} className="w-full aspect-video rounded-lg bg-primary-dynamic"></Div>
            <div className='w-full py-2 gap-2 flex flex-col'>
              <Div variables={ui} className="w-1/2 h-5 rounded-md bg-muted-dynamic" />
              <Div variables={ui} className="w-1/3 h-5 rounded-md bg-muted-dynamic" />
              <Div variables={ui} className="w-2/3 h-5 rounded-md bg-muted-dynamic" />
              <Div variables={ui} className="w-1/2 h-5 rounded-md bg-muted-dynamic" />
            </div>
            <Div variables={ui} className="w-full aspect-video rounded-lg bg-primary-dynamic"></Div>
            <div className='w-full py-2 gap-2 flex flex-col'>
              <Div variables={ui} className="w-1/2 h-5 rounded-md bg-muted-dynamic" />
              <Div variables={ui} className="w-1/3 h-5 rounded-md bg-muted-dynamic" />
              <Div variables={ui} className="w-2/3 h-5 rounded-md bg-muted-dynamic" />
              <Div variables={ui} className="w-1/2 h-5 rounded-md bg-muted-dynamic" />
            </div>
          </div>
          <div className="max-w-5xl w-full mx-auto flex flex-col gap-2">
            <div className="w-full h-fit grid lg:grid-cols-3 grid-cols-2 auto-rows-auto gap-4">
              <div className="w-full flex flex-col gap-2">
                <Div variables={ui} className="w-full h-48 aspect-video rounded-md bg-primary-dynamic" />
                <div className='w-full flex items-center justify-between'>
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Div variables={ui} className="w-full h-48 aspect-video rounded-md bg-primary-dynamic" />
                <div className='w-full flex items-center justify-between'>
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Div variables={ui} className="w-full h-48 aspect-video rounded-md bg-primary-dynamic" />
                <div className='w-full flex items-center justify-between'>
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Div variables={ui} className="w-full h-48 aspect-video rounded-md bg-primary-dynamic" />
                <div className='w-full flex items-center justify-between'>
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Div variables={ui} className="w-full h-48 aspect-video rounded-md bg-primary-dynamic" />
                <div className='w-full flex items-center justify-between'>
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Div variables={ui} className="w-full h-48 aspect-video rounded-md bg-primary-dynamic" />
                <div className='w-full flex items-center justify-between'>
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                  <Div variables={ui} className='w-1/3 h-5 rounded-sm bg-muted-dynamic' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="w-36 h-fit flex shrink-0 flex-col gap-4 sticky top-0 pt-6">
          <div className="flex flex-col gap-2 relative">
            <div className="w-full z-[10] flex items-center h-9 gap-2">
              <div className="h-full w-1">
                <Div variables={ui} className="h-full w-full bg-primary-dynamic rounded-sm" />
              </div>
              <Span variables={ui} className="text-sm">Обзор</Span>
            </div>
            <div className="w-full z-[10] flex items-center h-9 gap-2">
              <div className="h-full w-1"></div>
              <Span variables={ui} className="text-sm">Контент</Span>
            </div>
            <div className="w-full z-[10] flex items-center h-9 gap-2">
              <div className="h-full w-1"></div>
              <Span variables={ui} className="text-sm">Больше от автора</Span>
            </div>
            <Div variables={ui} className="absolute top-0 w-1 bg-muted-dynamic h-full rounded-sm" />
          </div>
          <Button variant="secondary" className="w-full rounded-full" variables={ui} />
        </aside>
      </div>
    </Div>
  )
}

export default page