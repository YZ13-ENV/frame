import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { SeparatorProps } from "@radix-ui/react-separator"

const Line = ({
      orientation='horizontal',
      className,
      variant='secondary'
  }: SeparatorProps & { variant?: 'primary' | 'secondary' }) => {
    return (
      <Separator orientation={orientation} className={cn(
        'z-0 from-background via-transparent to-background',
        orientation === 'horizontal' ? 'w-full bg-gradient-to-r' : 'h-full bg-gradient-to-b',
        variant === 'secondary' ? '' : 'bg-primary opacity-50', className
      )} />
    )
  }
  export default Line