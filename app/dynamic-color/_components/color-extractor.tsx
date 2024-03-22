"use client"
import { extractColors } from 'extract-colors'
import { FinalColor } from 'extract-colors/lib/types/Color'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import DynamicColorCard from './color-card'

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
    <div className='w-full flex flex-col'>
      <div className='p-3'>
        <Image
          src={src}
          className='!relative aspect-video rounded-2xl object-cover'
          width={1000} height={400}
          alt="image-for-test"
        />
      </div>
      <div className='w-full p-3 grid grid-cols-1 auto-rows-auto gap-4'>
        {
          colors.length === 0
            // .filter(color => color.intensity > .1)
            ? <div className='col-span-full h-64 flex items-center justify-center'>
              <span>Нет цветов</span>
            </div>
            : colors
              // .filter(color => color.intensity > .1)
              .map(color => <DynamicColorCard color={color} />)
        }
      </div>
    </div>
  )
}

export default ColorExtractor