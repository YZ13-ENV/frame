import { hexToHSL } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorProps } from "@/types/dynamic-color"
import { CSSProperties, HTMLAttributes, forwardRef } from "react"


export interface SpanProps
  extends DynamicColorProps, HTMLAttributes<HTMLDivElement> { }
const Div = forwardRef<HTMLDivElement, SpanProps>(
  ({ className, primary, secondary, ...props }, ref) => {
    const style: CSSProperties = {
      // @ts-ignore
      "--dynamic-secondary": hexToHSL(secondary),
      "--dynamic-primary": hexToHSL(primary)
    }
    return <div style={style} ref={ref} className={cn("bg-dynamic-secondary/10", className)} {...props} />
  }
)

Div.displayName = "Div"

export default Div