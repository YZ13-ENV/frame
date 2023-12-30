import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Blocks } from '@darkmaterial/core/types';
import { ReactNode } from 'react'

type Props = {
    block: Blocks
    index: number
    children: ReactNode
}
const Sortable = ({ block, index, children }: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ 
        id: index + 1,
        data: {
            block: block
        }
    });
      
    const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>{children}</div>
    )
}

export default Sortable