import { BiCog, BiUser } from 'react-icons/bi'
import { MenuMapProps } from 'ui'

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
                        icon: BiCog,
                        text: 'Конструктор'
                    }
                ]
            }
        ]
    }
]