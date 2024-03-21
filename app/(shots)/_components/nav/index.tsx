'use client'
import { cleanPathname, getNewOrderParams } from "@/const/categories"
import { useNav } from "@/hooks/useNav"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { usePathname, useRouter } from "next/navigation"
const Order = dynamic(() => import('./order'))
const Category = dynamic(() => import('./category'))

type Props = {
    padding?: boolean
    onlyOrder?: boolean
    onlyCategory?: boolean
}
const Nav = ({ padding = false, onlyCategory = false, onlyOrder = false }: Props) => {
    const { category, order } = useNav()
    const pathname = usePathname()
    const { push } = useRouter()
    const runWithNewParams = (customOrder?: string, customCategory?: string) => {
        const withCustomOrder = customOrder ? customOrder : order
        const withCustomCategory = customCategory ? customCategory : category
        const newSegment = getNewOrderParams(withCustomOrder, withCustomCategory)
        const newPath = cleanPathname(pathname, order, category)
        // console.log(pathname)
        // console.log(order, category)
        // console.log(newPath, newSegment)
        push(newPath + newSegment)
    }
    return (
        <div className={cn(
            padding ? 'px-6' : 'px-0',
            "nav-wrapper"
        )}>
            {
                !onlyOrder &&
                <Category
                    value={category}
                    onValueChange={value => runWithNewParams(order, value)}
                    order={order}
                />
            }
            {
                !onlyCategory &&
                <Order
                    value={order}
                    onValueChange={value => runWithNewParams(value)}
                />
            }
        </div>
    )
}

export default Nav