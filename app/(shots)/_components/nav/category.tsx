import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { withCustomSortTab } from "@/const/categories"
import { motion } from 'framer-motion'

type Props = {
  order: string
  value: string
  onValueChange: (value: string) => void
}
const Category = ({ onValueChange, order, value }: Props) => {
  return (
    <>
      <div className="nav-select">
        <Select defaultValue="/" value={value} onValueChange={state => onValueChange(state)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className='z-20'>
              {
                withCustomSortTab(order).map(tab =>
                  <SelectItem key={tab.value} onClick={() => onValueChange(tab.value)} value={tab.value}
                  >{tab.label}</SelectItem>
                )
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="nav-tabs ">
        <Tabs defaultValue="/" value={value} className="w-fit">
          <TabsList className='!bg-transparent !p-0 '>
            {
              withCustomSortTab(order).map(tab =>
                <TabsTrigger key={tab.value} onClick={() => onValueChange(tab.value)}
                  value={tab.value} className="relative !bg-transparent">
                  {tab.label}
                  {
                    tab.value === value && <motion.div layoutId='category-tab'
                      className="absolute left-0 -bottom-3 w-full h-0.5 rounded-md bg-primary z-[-1]" />
                  }
                </TabsTrigger>
              )
            }
          </TabsList>
        </Tabs>
      </div>
    </>
  )
}

export default Category