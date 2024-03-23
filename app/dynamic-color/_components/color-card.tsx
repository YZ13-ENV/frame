import { getDynamicColors } from "@/helpers/colors"
import { FinalColor } from "extract-colors/lib/types/Color"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { Button } from "./dynamic-color/button"
import Div from "./dynamic-color/div"
import H from "./dynamic-color/h"
import { Input } from "./dynamic-color/input"
import Span from "./dynamic-color/span"

type Props = {
  color: FinalColor
}
const DynamicColorCard = ({ color }: Props) => {
  const hex = color.hex
  const lightness = color.lightness
  const { isLightColor, original, ui } = getDynamicColors(
    hex, { lightness: lightness }
  )
  return (
    <Div
      variables={ui}
      className="w-full h-fit flex gap-4 items-start p-4 rounded-2xl bg-background-dynamic"
    >
      <div style={{ backgroundColor: hex }} className='w-9 shrink-0 aspect-square rounded-full' />
      <div className='w-full flex flex-col gap-4 pt-0.5'>
        <div className='w-full flex items-center justify-between gap-2'>
          <Link href={`/dynamic-color/${hex.substring(1, hex.length)}?lightness=${lightness}`}>
            <H className="px-3 rounded-full bg-background-dynamic" size={3} variables={ui}>{hex}</H>
          </Link>
          <Button
            className='gap-2 rounded-full'
            variables={ui}
            asChild
          >
            <Link href={`/dynamic-color/${hex.substring(1, hex.length)}/view?lightness=${lightness}`}>
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
        <Input variables={ui} placeholder="Проверка текста" />
        <H size={4} variables={ui}>Darkmaterial DynamicColor</H>
        <Span variables={ui}>
          DynamicColor, извлекает основные цвета из картинки и генерирует несколько палитр,
          можно выбрать наиболее подходящую и она будет применена для страницы работы
        </Span>
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