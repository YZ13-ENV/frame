'use client'
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { sortTabs } from "@/const/categories"
import { useCookieState } from "ahooks"

const DefaultSorting = () => {
  const [sorting, setSorting] = useCookieState('sorting', { defaultValue: 'following' })
  const selectedSorting = sortTabs().find(sort => sort.value.replace('/', '') === sorting)
  return (
    <div
      className="w-full h-fit flex items-center gap-2 justify-between border rounded-lg p-4">
      <div className="w-full h-fit flex flex-col gap-1">
        <span className="text-base font-medium inline-flex gap-2">Сортировка по умолчанию</span>
        <span className='text-sm text-muted-foreground'>Выберите сортировку по умолчанию</span>
      </div>
      <Select value={sorting} onValueChange={value => setSorting(value)}>
        <SelectTrigger>{selectedSorting?.label || "Не выбрано"}</SelectTrigger>
        <SelectContent>
          {
            sortTabs()
              .map(sort =>
                <SelectItem key={sort.value} value={sort.value.replace('/', '')}>{sort.label}</SelectItem>
              )
          }
        </SelectContent>
      </Select>
    </div>
  )
}

export default DefaultSorting