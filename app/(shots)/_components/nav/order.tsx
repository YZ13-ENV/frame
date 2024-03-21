"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sortTabs } from "@/const/categories"

type Props = {
  value: string
  onValueChange: (value: string) => void
}
const Order = ({ onValueChange, value }: Props) => {
  return (
    <Select defaultValue="/popular" onValueChange={state => onValueChange(state)} value={value}>
      <SelectTrigger className="w-[180px] z-0">
        <SelectValue placeholder="Select a order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className='z-20'>
          {
            sortTabs().map(tab => <SelectItem key={tab.value} value={tab.value}>{tab.label}</SelectItem>)
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default Order