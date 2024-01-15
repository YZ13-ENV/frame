import { HiSortDescending } from "react-icons/hi"
import { MdFiberNew } from "react-icons/md"
import { RiUserStarLine } from "react-icons/ri"

export const categories = [
    {
        label: 'Обзор',
        value: '/'
    },
    {
        label: 'Анимация',
        value: `/animation`
    },
    {
        label: 'Иллюстрация',
        value: `/illustration`
    },
    {
        label: 'Типография',
        value: `/typography`
    },
    {
        label: 'Дизайн продукта',
        value: `/product_design`
    },
    {
        label: 'Веб дизайн',
        value: `/web`
    },
    {
        label: 'Мобильный дизайн',
        value: `/mobile`
    }
]

export const detectCategoryTab = (segment: string, sortTab: string) => {
    const removedSortTab = segment.replace(sortTab, '')
    if (segment.endsWith(sortTab)) return '/'
    if (removedSortTab.endsWith('/animation')) return '/animation'
    if (removedSortTab.endsWith('/illustration')) return '/illustration'
    if (removedSortTab.endsWith('/typography')) return '/typography'
    if (removedSortTab.endsWith('/product_design')) return '/product_design'
    if (removedSortTab.endsWith('/web')) return '/web'
    if (removedSortTab.endsWith('/mobile')) return '/mobile'
    return '/'
}

export const cleanPathname = (pathname: string, orderTab: string, categoryTab: string) => {
    if (categoryTab !== '/') {
        const newPathname = pathname.replace(`${orderTab}${categoryTab}`, '')
        return newPathname
    } else {
        const newPathname = pathname.replace(orderTab, '')
        return newPathname
    }
}

export const detectSortTab = (segment: string) => {
    if (segment.includes('/recommendations')) return '/recommendations'
    if (segment.includes('/popular')) return '/popular'
    if (segment.includes('/following')) return '/following'
    if (segment.includes('/new')) return '/new'
    return '/popular'
}


export const withCustomSortTab = (sortTag: string) => [
    {
        label: 'Обзор',
        value: '/'
    },
    {
        label: 'Анимация',
        value: `/animation`
    },
    {
        label: 'Иллюстрация',
        value: `/illustration`
    },
    {
        label: 'Типография',
        value: `/typography`
    },
    {
        label: 'Дизайн продукта',
        value: `/product_design`
    },
    {
        label: 'Веб дизайн',
        value: `/web`
    },
    {
        label: 'Мобильный дизайн',
        value: `/mobile`
    },
]
export const sortTabs = (): { icon: JSX.Element, value: string, label: string }[] => [
    {
        icon: <RiUserStarLine className='inline-block mb-1' size={17} />,
        value: '/following',
        label: 'Подписки'
    },
    {
        icon: <HiSortDescending className='inline-block mb-1' size={17} />,
        label: 'Популярные',
        value: '/popular'
    },
    {
        icon: <MdFiberNew className='inline-block mb-1' size={17} />,
        label: 'Новые',
        value: '/new'
    },

]