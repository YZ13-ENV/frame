import { hexToHSL } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorProps } from "@/types/dynamic-color"
import { CSSProperties, HTMLAttributes, forwardRef } from "react"

type HElementProps = {
  size: 1 | 2 | 3 | 4 | 5 | 6
}
export interface HProps
  extends DynamicColorProps, HElementProps, HTMLAttributes<HTMLHeadingElement> { }
const H = forwardRef<HTMLHeadingElement, HProps>(
  ({ className, size, primary, secondary, ...props }, ref) => {
    const style: CSSProperties = {
      // @ts-ignore
      "--dynamic-secondary": hexToHSL(secondary),
      "--dynamic-primary": hexToHSL(primary)
    }
    if (size === 1) return <h1 style={style} ref={ref} className={cn("text-dynamic-primary", className)} {...props} />
    if (size === 2) return <h2 style={style} ref={ref} className={cn("text-dynamic-primary", className)} {...props} />
    if (size === 3) return <h3 style={style} ref={ref} className={cn("text-dynamic-primary", className)} {...props} />
    if (size === 4) return <h4 style={style} ref={ref} className={cn("text-dynamic-primary", className)} {...props} />
    if (size === 5) return <h5 style={style} ref={ref} className={cn("text-dynamic-primary", className)} {...props} />
    if (size === 6) return <h6 style={style} ref={ref} className={cn("text-dynamic-primary", className)} {...props} />
    return <h1 style={style} ref={ref} className={cn("text-dynamic-primary", className)} {...props} />
  }
)

H.displayName = "H"

export default H