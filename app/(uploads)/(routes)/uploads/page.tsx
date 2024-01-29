import { getVisitorId } from '@/helpers/cookies'
import { redirect } from 'next/navigation'

const page = () => {
  const visitorId = getVisitorId()
  if (visitorId) redirect("/uploads/shot")
  return redirect('/shots')
}

export default page