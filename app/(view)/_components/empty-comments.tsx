
const EmptyComments = () => {
  return (
    <div className="w-full py-4 h-full flex relative flex-col gap-2 rounded-lg justify-center items-center">
      <div className="top-0 left-0 absolute w-full rounded-lg h-full flex flex-col items-center justify-center">
        <span className="text-center">Никто не оставил комментарий</span>
      </div>

      <div className="w-full h-fit flex items-start gap-2">
        <div className="w-9 h-9 rounded-full shrink-0 bg-muted" />
        <div className="w-full h-full flex flex-col gap-1">
          <span className="w-full h-4 rounded-md bg-muted" />
          <span className="w-1/2 h-4 rounded-md bg-muted" />
          <span className="w-full h-6 mt-4 rounded-md bg-muted" />
          {/* <span className="w-2/3 h-6 rounded-md bg-muted" /> */}
        </div>
      </div>

      <div className="w-full h-fit flex items-start gap-2">
        <div className="w-9 h-9 rounded-full shrink-0 bg-muted" />
        <div className="w-full h-full flex flex-col gap-1">
          <span className="w-full h-4 rounded-md bg-muted" />
          <span className="w-1/2 h-4 rounded-md bg-muted" />
          <span className="w-full h-6 mt-4 rounded-md bg-muted" />
          {/* <span className="w-2/3 h-6 rounded-md bg-muted" /> */}
        </div>
      </div>

      <div className="w-full h-fit flex items-start gap-2">
        <div className="w-9 h-9 rounded-full shrink-0 bg-muted" />
        <div className="w-full h-full flex flex-col gap-1">
          <span className="w-full h-4 rounded-md bg-muted" />
          <span className="w-1/2 h-4 rounded-md bg-muted" />
          <span className="w-full h-6 mt-4 rounded-md bg-muted" />
          {/* <span className="w-2/3 h-6 rounded-md bg-muted" /> */}
        </div>
      </div>

    </div>
  )
}

export default EmptyComments