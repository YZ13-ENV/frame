import { initVariables } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorVariables } from "@/types/dynamic-color"
import { HTMLAttributes, forwardRef } from "react"

type HElementProps = {
  size: 1 | 2 | 3 | 4 | 5 | 6
}
export interface HProps
  extends HElementProps, HTMLAttributes<HTMLHeadingElement> {
  variables: DynamicColorVariables
}
const H = forwardRef<HTMLHeadingElement, HProps>(
  ({ className, size, variables, ...props }, ref) => {
    if (size === 1) return <h1 style={initVariables(variables)} ref={ref} className={cn("text-primary-dynamic", className)} {...props} />
    if (size === 2) return <h2 style={initVariables(variables)} ref={ref} className={cn("text-primary-dynamic", className)} {...props} />
    if (size === 3) return <h3 style={initVariables(variables)} ref={ref} className={cn("text-primary-dynamic", className)} {...props} />
    if (size === 4) return <h4 style={initVariables(variables)} ref={ref} className={cn("text-primary-dynamic", className)} {...props} />
    if (size === 5) return <h5 style={initVariables(variables)} ref={ref} className={cn("text-primary-dynamic", className)} {...props} />
    if (size === 6) return <h6 style={initVariables(variables)} ref={ref} className={cn("text-primary-dynamic", className)} {...props} />
    return <h1 style={initVariables(variables)} ref={ref} className={cn("text-primary-dynamic", className)} {...props} />
  }
)

H.displayName = "H"

export default H