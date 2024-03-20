import { MenuMapProps } from "@darkmaterial/ui";
import { BiCog, BiUser } from 'react-icons/bi';
import { TbDragDrop } from "react-icons/tb";

export const menu: MenuMapProps = [
    {
        type: 'wrapper',
        items: [
            {
                type: 'user'
            },
            {
                type: 'links',
                items: [
                    {
                        link: '/portfolio',
                        icon: BiUser,
                        text: 'Портфолио'
                    },
                    {
                        link: '/uploads/shot',
                        icon: TbDragDrop,
                        text: 'Конструктор'
                    },
                    {
                        link: '/settings',
                        icon: BiCog,
                        text: 'Настройки'
                    }
                ]
            }
        ]
    }
]