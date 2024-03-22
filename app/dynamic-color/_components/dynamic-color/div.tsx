import { initVariables } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorVariables } from "@/types/dynamic-color"
import { HTMLAttributes, forwardRef } from "react"


export interface SpanProps
  extends HTMLAttributes<HTMLDivElement> {
  variables: DynamicColorVariables
}
const Div = forwardRef<HTMLDivElement, SpanProps>(
  ({ className, variables, ...props }, ref) => {
    return <div style={initVariables(variables)} ref={ref} className={cn("bg-dynamic-secondary/10", className)} {...props} />
  }
)

Div.displayName = "Div"

export default Div