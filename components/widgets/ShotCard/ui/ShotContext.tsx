import { ReactNode } from 'react'
import { MdArrowRightAlt, MdOpenInNew } from 'react-icons/md'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from '@ui/shadcn/context-menu'

type Props = {
    children: ReactNode
}
const ShotContext = ({ children }: Props) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger disabled={process.env.NODE_ENV !== 'development'}>
                { children }
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem inset>
                    Открыть работу
                    <ContextMenuShortcut>
                        <MdOpenInNew size={17} />
                    </ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset>
                    Перейти в профиль
                    <ContextMenuShortcut>
                        <MdArrowRightAlt size={17} />
                    </ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem inset>
                    Нравится
                </ContextMenuItem>
                <ContextMenuItem inset>
                    Подписаться
                </ContextMenuItem>
                <ContextMenuItem disabled inset>
                    Добавить в коллекцию
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem disabled inset>
                    Пожаловаться на работу
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default ShotContext