'use client'

import { useAppSelector } from "@/components/entities/store/store"
import { setBlocks } from "@/components/entities/uploader/draft"
import { BiChevronDown, BiChevronUp, BiTrashAlt } from "react-icons/bi"
import { LuComponent } from "react-icons/lu"
import { useDispatch } from "react-redux"

const Components = () => {
  const blocks = useAppSelector(state => state.uploader.draft.draft.blocks)
  const dispatch = useDispatch()
  const remove = (index: number) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index)
    dispatch(setBlocks(updatedBlocks))
  }
  const move = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'down' ? index - 1 : index + 1
    const initialBlock = blocks[index]
    const targetBlock = blocks[targetIndex]
    const updatedBlocks = blocks.map((_, i) => {
        if (i === index) return targetBlock
        if (i === targetIndex) return initialBlock
        return _
    })
    dispatch(setBlocks(updatedBlocks))

  }
  return (
    <div className="flex flex-col w-full gap-2 h-fit">
      {
          blocks.length
          ? blocks.map((block, i) => {
            const isFirstBlock = i === 0
            const isLastBlock = i === blocks.length -1
            return (
                <div key={block.id + ' ' + i} className="flex items-center justify-between w-full px-2 rounded-lg cursor-pointer h-9 hover:bg-muted">
                    <span className="capitalize">
                        { block.type }
                    </span>
                    <div className="flex items-center gap-0">
                        <button onClick={() => move(i, 'up')} disabled={isFirstBlock} className="p-1 rounded-md hover:bg-card disabled:text-muted-foreground">
                            <BiChevronUp />
                        </button>
                        <button onClick={() => move(i, 'down')} disabled={isLastBlock} className="p-1 rounded-md hover:bg-card disabled:text-muted-foreground">
                            <BiChevronDown />
                        </button>
                        <button onClick={() => remove(i)} className="p-1 rounded-md hover:bg-card">
                            <BiTrashAlt />
                        </button>
                    </div>
                </div>
            )
          }

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