
const MemberCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4 fit rounded-lg border p-4">
      <div className="w-full h-12 flex items-center gap-2 justify-between">
        <div className="w-fit h-fit flex items-center gap-2">
          <div className="w-9 aspect-square rounded-full bg-muted" />
          <div className="w-full h-full flex flex-col justify-center gap-1">
            <span className="w-36 h-5 rounded-md bg-muted"></span>
            <span className="w-24 h-3 rounded-sm bg-muted"></span>
          </div>
        </div>
        <button className="h-9 w-36 rounded-md bg-muted"></button>
      </div>
      <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
        <div className="w-full aspect-[4/3] rounded-lg border" />
        <div className="w-full aspect-[4/3] rounded-lg border" />
        <div className="w-full aspect-[4/3] rounded-lg border" />
        <div className="w-full aspect-[4/3] rounded-lg border" />
      </div>
    </div>
  )
}

export default MemberCardSkeleton