import { Button } from "@/components/ui/button"
import { BiRightArrowAlt } from "react-icons/bi"

const Controls = () => {
    return (
        <div className='w-fit p-6 absolute top-0 right-0 flex items-center gap-2'>
            <Button size='icon' variant='secondary'><BiRightArrowAlt size={20} /></Button>
        </div>
    )
}

export default Controls