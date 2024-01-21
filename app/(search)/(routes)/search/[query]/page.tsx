import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Props = {
  params: {
    query: string
  }
}
const page = ({ params }: Props) => {
  const cookiesList = cookies()
  const uidCookie = cookiesList.get('uid')
  const visitorId = uidCookie ? uidCookie.value : null
  const order = visitorId ? 'following' : 'popular'
  return redirect(`/search/${params.query}/${order}`)
}

export default page