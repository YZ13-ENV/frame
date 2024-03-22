import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ButtonHTMLAttributes, forwardRef } from "react"

import { hexToHSL } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorProps } from "@/types/dynamic-color"


const buttonVariants = cva(
  "dynamic-color inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-dynamic-primary text-dynamic-secondary shadow hover:bg-dynamic-primary/90",
        outline:
          "text-dynamic-primary border !border-dynamic-secondary bg-transparent shadow-sm hover:bg-dynamic-secondary/80 shadow-sm hover:bg-dynamic-secondary hover:text-dynamic-primary",
        secondary:
          "bg-dynamic-secondary text-dynamic-primary shadow-sm hover:bg-dynamic-secondary/80",
        ghost: "text-dynamic-primary hover:bg-dynamic-secondary hover:text-dynamic-primary",
        link: "text-dynamic-primary underline-offset-4 hover:underline",
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

export interface ButtonProps extends DynamicColorProps, ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, asChild = false, variant, primary, secondary, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        data-variant={variant}
        className={cn(buttonVariants({ size, className, variant }))}
        style={{
          // @ts-ignore
          "--dynamic-secondary": hexToHSL(secondary),
          "--dynamic-primary": hexToHSL(primary)
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
