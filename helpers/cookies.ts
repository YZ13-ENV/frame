import { cookies } from "next/headers"

export const getVisitorId = () => {
    const cookiesList = cookies()
    const visitorIdCookie = cookiesList.get('uid')
    const visitorId = visitorIdCookie ? visitorIdCookie.value : null
    return visitorId
}