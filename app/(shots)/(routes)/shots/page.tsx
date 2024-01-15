import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const page = () => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const visitorId = uidCookie ? uidCookie.value : null
    if (visitorId) redirect('/shots/following')
    return redirect('/shots/popular')
}

export default page