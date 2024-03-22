import { InputHTMLAttributes, forwardRef } from "react"

import { initVariables } from "@/helpers/colors"
import { cn } from "@/lib/utils"
import { DynamicColorVariables } from "@/types/dynamic-color"

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  variables: DynamicColorVariables
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variables, ...props }, ref) => {

    return (
      <input
        style={initVariables(variables)}
        type={type}
        className={cn(
          "flex text-primary-dynamic h-9 w-full rounded-md border !border-secondary-dynamic bg-secondary-dynamic/10 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-dynamic focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dynamic disabled:cursor-not-allowed disabled:opacity-50",
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
