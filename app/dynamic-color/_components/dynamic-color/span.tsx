import { initVariables } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorVariables } from "@/types/dynamic-color"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"

const spanVariants = cva(
  "",
  {
    variants: {
      variant: {
        "primary": "text-primary-dynamic",
        "secondary": "text-muted-dynamic"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
)

export interface SpanProps
  extends VariantProps<typeof spanVariants>, HTMLAttributes<HTMLSpanElement> {
  variables: DynamicColorVariables
}
const Span = forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, variables, variant, ...props }, ref) => {
    return <span style={initVariables(variables)} ref={ref} className={cn(spanVariants({ variant, className }), className)} {...props} />
  }
)

Span.displayName = "Span"

export default Span