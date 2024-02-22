import Footer from "@/components/shared/footer"
import Header from "@/components/widgets/header"
import SettingsSideNav from "../../_components/settings-side-nav"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { user } from "api"
import SettingsHeader from "../../_components/settings-header"

type Props = {
  children: JSX.Element | JSX.Element[]
}
const layout = async ({ children }: Props) => {
  const cookiesList = cookies()
  const visitorIdCookie = cookiesList.get('uid')
  const visitorId = visitorIdCookie ? visitorIdCookie.value : null
  const author = visitorId ? await user.byId.short(visitorId) : null
  if (!visitorId || !author) return redirect('/shots/popular')
  return (
    <>
      <Header />
      <div style={{ minHeight: 'calc(100vh - 64px - 128px)' }}
        className="max-w-5xl w-full flex flex-col px-6 py-12 mx-auto">
        <div className="w-full h-fit flex items-center justify-between">
          <SettingsHeader author={author} />
        </div>
        <div className="settings-content-wrapper">
          <SettingsSideNav />
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default layout