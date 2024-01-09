import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const page = () => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    if (uid) return redirect('/' + uid)
    return redirect('/shots/popular')
}

export default page