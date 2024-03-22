import { hexToHSL } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorProps } from "@/types/dynamic-color"
import { VariantProps, cva } from "class-variance-authority"
import { CSSProperties, HTMLAttributes, forwardRef } from "react"

const spanVariants = cva(
  "",
  {
    variants: {
      variant: {
        "primary": "text-dynamic-primary",
        "secondary": "text-dynamic-primary/70"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
)

export interface SpanProps
  extends DynamicColorProps, VariantProps<typeof spanVariants>, HTMLAttributes<HTMLSpanElement> { }
const Span = forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, primary, secondary, variant, ...props }, ref) => {
    const style: CSSProperties = {
      // @ts-ignore
      "--dynamic-secondary": hexToHSL(secondary),
      "--dynamic-primary": hexToHSL(primary)
    }
    return <span style={style} ref={ref} className={cn(spanVariants({ variant, className }), className)} {...props} />
  }
)

Span.displayName = "Span"

export default Span