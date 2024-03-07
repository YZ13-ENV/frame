import AuthorBannerWrapper from "@/app/(user)/_components/banner/author-banner-wrapper"

const PortfolioLayoutSkeleton = () => {
  return (
    <>
      <AuthorBannerWrapper>
        <>
          <div className="flex items-center gap-4">
            <div className="w-24 aspect-square rounded-full bg-muted" />
            <div className="h-full flex flex-col justify-center gap-2">
              <span className="h-10 w-72 rounded-md bg-muted" />
              <div className="flex items-center gap-2">
                <span className="w-36 h-7 rounded-full bg-muted" />
                <span className="w-36 h-7 rounded-sm bg-muted" />
              </div>
            </div>
          </div>
          <div className="w-72 h-12 bg-muted rounded-md my-4">
            <span />
          </div>
          <div className="flex items-center gap-2 my-6">
            <span className="w-24 h-5 rounded-sm bg-muted" />
            <span className="w-24 h-5 rounded-sm bg-muted" />
            <span className="w-24 h-5 rounded-sm bg-muted" />
          </div>
        </>
      </AuthorBannerWrapper>
      <div className="w-full py-2 border-b sticky top-0 bg-card">
        <div className="mx-auto max-w-screen-2xl px-6 w-full flex items-center justify-start gap-2">
          <div className="w-24 h-9 rounded-sm bg-muted" />
          <div className="w-24 h-9 rounded-sm bg-muted" />
          <div className="w-24 h-9 rounded-sm bg-muted" />
        </div>
      </div>
    </>
  )
}
export default PortfolioLayoutSkeleton