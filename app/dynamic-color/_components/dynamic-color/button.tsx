import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ButtonHTMLAttributes, forwardRef } from "react"

import { initVariables } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorVariables } from "@/types/dynamic-color"


const buttonVariants = cva(
  "dynamic-color inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-dynamic text-primary-foreground shadow hover:bg-primary-dynamic/90",
        outline:
          "border !border-input-dynamic bg-transparent shadow-sm hover:bg-accent-dynamic text-accent-dynamic-foreground",
        secondary:
          "bg-secondary-dynamic text-secondary-dynamic-foreground shadow-sm hover:bg-secondary-dynamic/80",
        ghost: "bg-transparent text-accent-dynamic-foreground hover:bg-accent-dynamic hover:text-accent-dynamic-foreground",
        link: "text-primary-dynamic underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  variables: DynamicColorVariables,
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, asChild = false, variables, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        data-variant={variant}
        className={cn("", buttonVariants({ size, className, variant }))}
        style={initVariables(variables)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
