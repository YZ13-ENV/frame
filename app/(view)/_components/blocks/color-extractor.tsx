"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getDynamicColors } from '@/helpers/colors'
import { extractColors } from 'extract-colors'
import { FinalColor } from 'extract-colors/lib/types/Color'
import { cubicBezier, motion } from "framer-motion"
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  src: string
}
const ColorExtractor = ({ src }: Props) => {
  const [colors, setColors] = useState<FinalColor[]>([])
  useEffect(() => {
    if (src)
      extractColors(src, { crossOrigin: "anonymous" })
        .then(setColors)
  }, [src])
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='p-6'>
        <Image
          src={src}
          className='!relative aspect-video rounded-2xl object-cover'
          width={1000} height={400}
          alt="image-for-test"
        />
      </div>
      <div className='w-full p-6 grid grid-cols-2 auto-rows-auto gap-4'>
        {
          colors.length === 0
            // .filter(color => color.intensity > .1)
            ? <div className='col-span-full h-64 flex items-center justify-center'>
              <span>Нет цветов</span>
            </div>
            : colors
              // .filter(color => color.intensity > .1)
              .map(
                color => {
                  const hex = color.hex
                  const lightness = color.lightness
                  const intensity = color.intensity
                  const { extra, isLightColor, original, ui } = getDynamicColors(hex, { intensity: intensity, lightness: lightness })
                  const { less_darker, less_lighter, more_darker, more_lighter } = extra
                  const { background, text } = ui
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delayChildren: .2,
                        easings: cubicBezier
                      }}
                      style={{ backgroundColor: background }}
                      className="w-full h-fit flex gap-4 items-start p-4 rounded-2xl"
                    >
                      <div style={{ backgroundColor: original }} className='w-9 shrink-0 aspect-square rounded-full' />
                      <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-col w-full'>
                          <span style={{ color: text }} className="text-sm">
                            Частота: {color.intensity.toFixed(2)}
                          </span>
                          <span style={{ color: text }} className="text-sm">
                            Яркость: {lightness.toFixed(2)}
                          </span>
                          <span style={{ color: text }} className="text-sm">
                            {isLightColor ? "Светлый" : "Темный"} цвет
                          </span>
                        </div>
                        <div className='flex flex-col w-full'>
                          <span style={{ color: text }} className="text-sm">
                            Светлый 1 HEX: <span style={{ color: more_lighter }}>{more_lighter}</span>
                          </span>
                          <span style={{ color: text }} className="text-sm">
                            Светлый 2 HEX: <span style={{ color: less_lighter }}>{less_lighter}</span>
                          </span>
                          <span style={{ color: text }} className="text-sm">
                            Оригинальный HEX: <span style={{ color: original }}>{original}</span>
                          </span>
                          <span style={{ color: text }} className="text-sm">
                            Темный HEX: <span style={{ color: less_darker }}>{less_darker}</span>
                          </span>
                          <span style={{ color: text }} className="text-sm">
                            Темный HEX: <span style={{ color: more_darker }}>{more_darker}</span>
                          </span>
                        </div>
                        <div className='w-full flex items-center rounded-full overflow-hidden'>
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
                        </div>
                      </div>
                    </motion.div>
                  )
                })
        }
      </div>
    </div>
  )
}

export default ColorExtractor