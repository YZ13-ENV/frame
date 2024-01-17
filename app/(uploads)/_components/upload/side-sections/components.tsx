'use client'

import { useAppSelector } from "@/components/entities/store/store"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { LuComponent } from "react-icons/lu"

const Components = () => {
  const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
  return (
    <div className="flex flex-col w-full gap-2 h-fit">
      {
          blocks.length
          ? blocks.map((block, i) =>
              <div key={block.id + ' ' + i} className="flex items-center justify-between w-full px-2 rounded-lg cursor-pointer h-9 hover:bg-muted">
                  <span>
                      { block.type }
                      -
                      { block.id }
                  </span>
                  <div className="flex items-center gap-2">
                      <BiChevronUp />
                      <BiChevronDown />
                  </div>
              </div>
          )
          : <div className="flex flex-col items-center justify-center w-full h-48 gap-4">
              <LuComponent size={28} className='text-muted-foreground' />
              <span className="text-sm text-center text-muted-foreground">Нет добавленных компонентов</span>
          </div>
      }
  </div>
  )
}

export default Components