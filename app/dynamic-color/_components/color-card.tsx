import { getDynamicColors } from "@/helpers/colors"
import { FinalColor } from "extract-colors/lib/types/Color"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { Button } from "./dynamic-color/button"
import Div from "./dynamic-color/div"
import H from "./dynamic-color/h"
import Span from "./dynamic-color/span"

type Props = {
  color: FinalColor
}
const DynamicColorCard = ({ color }: Props) => {
  const hex = color.hex
  const lightness = color.lightness
  const intensity = color.intensity
  const { isLightColor, original, ui } = getDynamicColors(
    hex, { intensity: intensity, lightness: lightness }
  )
  return (
    <Div
      variables={ui}
      className="w-full h-fit flex gap-4 items-start p-4 rounded-2xl bg-background-dynamic"
    >
      <div style={{ backgroundColor: hex }} className='w-9 shrink-0 aspect-square rounded-full' />
      <div className='w-full flex flex-col gap-4 pt-1'>
        <div className='w-full flex items-center justify-between gap-2'>
          <Link href={`/dynamic-color/${hex.substring(1, hex.length)}?lightness=${lightness}&intensity=${intensity}`}>
            <H size={3} variables={ui}>{hex}</H>
          </Link>
          <Button
            className='gap-2 rounded-full'
            variables={ui}
            asChild
          >
            <Link href={`/dynamic-color/${hex.substring(1, hex.length)}/view?lightness=${lightness}&intensity=${intensity}`}>
              Макет работы <BiRightArrowAlt size={16} />
            </Link>
          </Button>
        </div>
        <div className='flex gap-4 w-full'>
          <Span variables={ui} className="text-sm">
            Частота: {color.intensity.toFixed(2)}
          </Span>
          <Span variables={ui} className="text-sm">
            Яркость: {lightness.toFixed(2)}
          </Span>
          <Span variables={ui} className="text-sm">
            {isLightColor ? "Светлый" : "Темный"} цвет
          </Span>
        </div>
        {/* <div className='w-full flex items-center rounded-full overflow-hidden'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  style={{ backgroundColor: more_lighter }}
                  className='w-1/5 h-7 shrink-0' />
              </TooltipTrigger>
              <TooltipContent>
                {more_lighter}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  style={{ backgroundColor: less_lighter }}
                  className='w-1/5 h-7 shrink-0' />
              </TooltipTrigger>
              <TooltipContent>
                {less_lighter}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  style={{ backgroundColor: original }}
                  className='w-1/5 h-7 shrink-0' />
              </TooltipTrigger>
              <TooltipContent>
                {original}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  style={{ backgroundColor: less_darker }}
                  className='w-1/5 h-7 shrink-0' />
              </TooltipTrigger>
              <TooltipContent>
                {less_darker}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  style={{ backgroundColor: more_darker }}
                  className='w-1/5 h-7 shrink-0' />
              </TooltipTrigger>
              <TooltipContent>
                {more_darker}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div> */}
      </div>
    </Div>
  )
}

export default DynamicColorCard