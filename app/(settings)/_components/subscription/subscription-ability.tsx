import { Switch } from "@/components/ui/switch"
import PlusBadge from "../plus-badge"

type Props = {
  title: string
  description: string
  disabled?: boolean
  checked?: boolean
}
const SubscriptionAbility = ({ description, title, checked=false, disabled=true }: Props) => {
  return (
    <div className="w-full h-fit flex items-center gap-2 justify-between">
      <div className="w-fit h-fit flex flex-col gap-1">
        <span className="text-base font-medium inline-flex gap-2">
          { title } <PlusBadge />
        </span>
        <span className='text-sm text-muted-foreground'>
          { description }
        </span>
      </div>
      <Switch checked={checked} disabled={disabled} />
    </div>
  )
}

export default SubscriptionAbility