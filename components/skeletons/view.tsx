import { Separator } from "../ui/separator"

const ViewSkeleton = () => {
  const ScrollSide = () => {
    return (
      <aside className="w-36 h-fit flex shrink-0 flex-col gap-4 sticky top-0 pt-6">
        <div className="flex flex-col gap-2 relative">
          <div className="w-full z-[10] flex items-center h-9 gap-2">
            <div className="h-full w-1">
              <div className="h-full w-full bg-primary rounded-sm"></div>
            </div>
            <span className="text-sm text-accent-foreground">Обзор</span>
          </div>
          <div className="w-full z-[10] flex items-center h-9 gap-2">
            <div className="h-full w-1"></div>
            <span className="text-sm text-accent-foreground">Контент</span>
          </div>
          <div className="w-full z-[10] flex items-center h-9 gap-2">
            <div className="h-full w-1"></div>
            <span className="text-sm text-accent-foreground">Больше от автора</span>
          </div>
          <div className="absolute top-0 w-1 bg-muted h-full rounded-sm" />
        </div>
        <button className="w-full h-9 rounded-sm bg-muted" />
      </aside>
    )
  }
  return (
    <div className="max-w-7xl mx-auto w-full min-h-screen flex items-start gap-6 px-6">
      <div className="w-full space-y-6 py-6">
        <div className="max-w-5xl w-full mx-auto flex flex-col gap-2">
          <h2 className="w-64 h-9 rounded-md bg-muted" />
          <div className='w-full flex items-center justify-between'>
            <span className="w-32 h-6 rounded-sm bg-muted" />
            <div className='flex items-center gap-2'>
              <button className="w-24 h-9 rounded-sm bg-muted" />
              <button className="w-36 h-9 rounded-sm bg-muted" />
            </div>
          </div>
        </div>
        <div className="max-w-5xl w-full mx-auto flex flex-col gap-2">
          <div className="w-full aspect-video rounded-lg bg-muted"></div>
        </div>
        <div className="max-w-5xl w-full mx-auto flex flex-col gap-2">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-9 aspect-square rounded-full bg-muted" />
              <div className="h-fit flex flex-col justify-center gap-1">
                <span className='w-36 h-5 rounded-sm bg-muted'></span>
                <span className='w-24 h-4 rounded-sm bg-muted'></span>
              </div>
            </div>
            <button className="w-36 h-9 rounded-sm bg-muted" />
          </div>
        </div>
        <Separator />
        <div className="max-w-5xl w-full mx-auto flex flex-col gap-2">
          <div className="w-full aspect-video rounded-lg bg-muted"></div>
          <div className='w-full py-2 gap-2 flex flex-col'>
            <div className="w-1/2 h-5 rounded-md bg-muted" />
            <div className="w-1/3 h-5 rounded-md bg-muted" />
            <div className="w-2/3 h-5 rounded-md bg-muted" />
            <div className="w-1/2 h-5 rounded-md bg-muted" />
          </div>
          <div className="w-full aspect-video rounded-lg bg-muted"></div>
          <div className='w-full py-2 gap-2 flex flex-col'>
            <div className="w-1/2 h-5 rounded-md bg-muted" />
            <div className="w-1/3 h-5 rounded-md bg-muted" />
            <div className="w-2/3 h-5 rounded-md bg-muted" />
            <div className="w-1/2 h-5 rounded-md bg-muted" />
          </div>
        </div>
        <Separator />
        <div className="max-w-5xl w-full mx-auto flex flex-col gap-2">
          <div className="w-full h-fit grid lg:grid-cols-3 grid-cols-2 auto-rows-auto gap-4">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-48 aspect-video rounded-md bg-muted" />
              <div className='w-full flex items-center justify-between'>
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-48 aspect-video rounded-md bg-muted" />
              <div className='w-full flex items-center justify-between'>
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-48 aspect-video rounded-md bg-muted" />
              <div className='w-full flex items-center justify-between'>
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-48 aspect-video rounded-md bg-muted" />
              <div className='w-full flex items-center justify-between'>
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-48 aspect-video rounded-md bg-muted" />
              <div className='w-full flex items-center justify-between'>
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-48 aspect-video rounded-md bg-muted" />
              <div className='w-full flex items-center justify-between'>
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
                <div className='w-1/3 h-5 rounded-sm bg-muted' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollSide />
    </div>
  )
}

export default ViewSkeleton