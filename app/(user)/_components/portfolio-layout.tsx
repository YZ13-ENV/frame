import { who } from "@/api/who"
import { bum } from "@darkmaterial/api"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import Author from "./banner/author"
import AuthorBannerWrapper from "./banner/author-banner-wrapper"
import AuthorStats from "./banner/author-stats"
import DynamicNav from "./dynamic-nav"
import SignatureEditor from "./signature-editor"

type Props = {
  nick: string
  visitor: string | undefined
}
const PortfolioLayout = async ({ nick, visitor }: Props) => {
  const portfolio = await who(nick, visitor)
  if (!portfolio) return notFound()
  const signature = portfolio.type === 'team' && portfolio.data
    ? portfolio.data.signature :
    portfolio.type === 'user' && portfolio.data
      ? await bum.author.getSignature(portfolio.data.uid)
      : ''
  const name = portfolio.type === 'team' && portfolio.data ? portfolio.data.name : portfolio.type === 'user' && portfolio.data ? portfolio.data.displayName : 'Не указано'
  const photoURL = portfolio.type === 'team' && portfolio.data ? portfolio.data.photoURL || '' : portfolio.type === 'user' && portfolio.data ? portfolio.data.photoUrl : ''
  const prefix = `/${nick}`
  return (
    <>
      <AuthorBannerWrapper>
        {
          (portfolio.type === 'team' && portfolio.data) ?
            <>
              <Author portfolio={portfolio} />
              <SignatureEditor signature={signature} readOnly={true} id={portfolio.data.doc_id} />
              <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                <AuthorStats type={portfolio.type} id={portfolio.data.doc_id} />
              </Suspense>
            </>
            : (portfolio.type === 'user' && portfolio.data) ?
              <>
                <Author portfolio={portfolio} />
                <SignatureEditor signature={signature} readOnly={portfolio.current ? portfolio.current.uid !== portfolio.data.uid : true} id={portfolio.data.uid} />
                <Suspense fallback={<div className="w-64 h-5 rounded-md bg-muted animate-pulse" />}>
                  <AuthorStats type={portfolio.type} id={portfolio.data.uid} />
                </Suspense>
              </>
              : <></>
        }
      </AuthorBannerWrapper>
      <DynamicNav layout={portfolio.type} prefix={prefix} user={{ name: name, photoURL: photoURL }} />
    </>
  )
}

export default PortfolioLayout