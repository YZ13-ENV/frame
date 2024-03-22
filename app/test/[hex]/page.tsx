import { Button as DefaultButton } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getDynamicColors, hexToHSL } from "@/helpers/colors"
import { redirect } from "next/navigation"
import { Button } from "../_components/dynamic-color/button"
import H from "../_components/dynamic-color/h"
import { Input } from "../_components/dynamic-color/input"
import Span from "../_components/dynamic-color/span"
type Props = {
  params: {
    hex: string
  }
  searchParams: {
    lightness: string
    intensity: string
  }
}
const page = ({ params, searchParams }: Props) => {
  const { hex } = params
  if (hex.length > 6) return redirect("/test")
  const lightness = searchParams.lightness ? parseInt(searchParams.lightness) : .5
  const intensity = searchParams.intensity ? parseInt(searchParams.intensity) : .1
  const validHEX = `#${hex}`
  const { extra, isLightColor, original, ui } = getDynamicColors(validHEX, { intensity: intensity, lightness: lightness })
  const { less_darker, less_lighter, more_darker, more_lighter } = extra
  const { background, text } = ui
  return (
    <div className="p-6 w-full min-h-screen flex flex-col items-center gap-4">
      <h1 className="text-center">{validHEX}</h1>
      <span className="text-center">{hexToHSL(validHEX)}</span>
      <div className='w-full h-12 flex items-center rounded-full overflow-hidden'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                style={{ backgroundColor: more_lighter }}
                className='w-1/5 h-full shrink-0' />
            </TooltipTrigger>
            <TooltipContent>
              {more_lighter}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                style={{ backgroundColor: less_lighter }}
                className='w-1/5 h-full shrink-0' />
            </TooltipTrigger>
            <TooltipContent>
              {less_lighter}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                style={{ backgroundColor: original }}
                className='w-1/5 h-full shrink-0' />
            </TooltipTrigger>
            <TooltipContent>
              {original}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                style={{ backgroundColor: less_darker }}
                className='w-1/5 h-full shrink-0' />
            </TooltipTrigger>
            <TooltipContent>
              {less_darker}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                style={{ backgroundColor: more_darker }}
                className='w-1/5 h-full shrink-0' />
            </TooltipTrigger>
            <TooltipContent>
              {more_darker}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-full flex flex-col gap-6 items-center">
        <div className="w-full flex items-center gap-2">
          <H size={1} secondary={background} primary={text}>H1</H>
          <H size={2} secondary={background} primary={text}>H2</H>
          <H size={3} secondary={background} primary={text}>H3</H>
          <H size={4} secondary={background} primary={text}>H4</H>
          <H size={5} secondary={background} primary={text}>H5</H>
          <H size={6} secondary={background} primary={text}>H6</H>
        </div>
        <div className="w-full flex items-center gap-2">
          <Span variant="primary" secondary={background} primary={text}>Span</Span>
          <Span variant="secondary" secondary={background} primary={text}>Span</Span>
        </div>
        <div className="w-full flex items-start gap-6">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Button variant="default" secondary={background} primary={text}>Кнопка</Button>
              <Button variant="secondary" secondary={background} primary={text}>Кнопка</Button>
              <Button variant="outline" secondary={background} primary={text}>Кнопка</Button>
              <Button variant="ghost" secondary={background} primary={text}>Кнопка</Button>
              <Button variant="link" secondary={background} primary={text}>Кнопка</Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button disabled variant="default" secondary={background} primary={text}>Кнопка</Button>
              <Button disabled variant="secondary" secondary={background} primary={text}>Кнопка</Button>
              <Button disabled variant="outline" secondary={background} primary={text}>Кнопка</Button>
              <Button disabled variant="ghost" secondary={background} primary={text}>Кнопка</Button>
              <Button disabled variant="link" secondary={background} primary={text}>Кнопка</Button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <DefaultButton variant="default">Кнопка</DefaultButton>
              <DefaultButton variant="secondary">Кнопка</DefaultButton>
              <DefaultButton variant="outline">Кнопка</DefaultButton>
              <DefaultButton variant="ghost">Кнопка</DefaultButton>
              <DefaultButton variant="link">Кнопка</DefaultButton>
            </div>
            <div className="flex flex-col gap-2">
              <DefaultButton disabled variant="default">Кнопка</DefaultButton>
              <DefaultButton disabled variant="secondary">Кнопка</DefaultButton>
              <DefaultButton disabled variant="outline">Кнопка</DefaultButton>
              <DefaultButton disabled variant="ghost">Кнопка</DefaultButton>
              <DefaultButton disabled variant="link">Кнопка</DefaultButton>
            </div>
          </div>
        </div>
        <Input secondary={background} primary={text} placeholder="Текст" />
        <Input disabled secondary={background} primary={text} placeholder="Текст" />
      </div>

    </div>
  )
}

export default page