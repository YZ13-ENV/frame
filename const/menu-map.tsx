import { BiCog, BiUser } from 'react-icons/bi'
import { MenuMapProps } from 'ui'
import { auth } from '@/utils/app'

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
    },
    {
        type: 'wrapper',
        className: 'h-fit w-full mt-auto',
        items: [
            {
                type: 'sign-out',
                action: async() => await auth.signOut()
            }
        ]
    }

]