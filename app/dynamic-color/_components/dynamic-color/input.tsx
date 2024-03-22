import { InputHTMLAttributes, forwardRef } from "react"

import { hexToHSL } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorProps } from "@/types/dynamic-color"

export interface InputProps
  extends DynamicColorProps, InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, primary, secondary, ...props }, ref) => {
    return (
      <input
        style={{
          // @ts-ignore
          "--dynamic-secondary": hexToHSL(secondary),
          "--dynamic-primary": hexToHSL(primary)
        }}
        type={type}
        className={cn(
          "flex text-dynamic-primary h-9 w-full rounded-md border !border-dynamic-secondary bg-dynamic-secondary/10 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-dynamic-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dynamic-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
