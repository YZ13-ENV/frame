import User from "@/components/shared/user-circle"
import { Button } from "@/components/ui/button"


type Props = {
    showPublish?: boolean
}
const Controls = ({ showPublish=false }: Props) => {
    return (
        <div className='absolute top-0 right-0 flex items-center gap-4 p-6 w-fit'>
            { showPublish && <Button>Опубликовать</Button> }
            <User />
        </div>
    )
}

export default Controls