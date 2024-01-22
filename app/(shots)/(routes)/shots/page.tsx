import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const page = () => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const visitorId = uidCookie ? uidCookie.value : null
    const preferredSortingCookie = cookiesList.get('sorting')
    const preferredSorting = preferredSortingCookie ? preferredSortingCookie.value : null
    if (preferredSorting) {
        return redirect(`/shots/${preferredSorting}`)
    } else {
        if (visitorId) redirect('/shots/following')
        return redirect('/shots/popular')
    }
}

export default page