import { withCustomSortTab } from '@/const/categories'
import { useNav } from '@/hooks/useNav'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const CategoryTabs = () => {
  const { order, category } = useNav()
  const tabs = withCustomSortTab(order)
  // console.log(order, category)
  return (
    <div className="w-full h-8 no-scrollbar flex items-center justify-between gap-2 overflow-x-auto">
      {
        tabs.map(tab => {
          return <Link
            href={`/shots${order}` + tab.value}
            key={tab.value + tab.label}
            className={cn(
              tab.value === category ? "bg-primary text-primary-foreground" : "bg-muted text-accent-foreground",
              "w-fit px-3 shrink-0 h-full rounded-lg flex items-center gap-1 transition-colors"
            )}>
            <span className="text-sm shrink-0">{tab.label}</span>
          </Link>
        })
      }
    </div>
  )
}

export default CategoryTabs
