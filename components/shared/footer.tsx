import FrameMark from "./frame-mark"

type Props = {
  profileMode?: boolean
  className?: string
}
const Footer = ({ className = '', profileMode = false }: Props) => {
  return (
    <footer className="w-full h-fit">
      <div className={`${profileMode ? "max-w-screen-2xl bg-card border-t border-x" : "max-w-7xl"} mx-auto w-full h-fit flex flex-col gap-6 ${className ? className : 'p-6'}`}>
        <div className={"w-full h-fit gap-4 flex items-center justify-between"}>
          <FrameMark />
          <div className='flex items-center justify-center gap-4 flex-wrap'>
            <span className='text-muted-foreground text-sm'>Работы</span>
            <span className='text-muted-foreground text-sm'>О Frame</span>
          </div>
          <div className='flex items-center gap-2 flex-wrap'>
            <div className="w-5 h-5 rounded-md bg-muted" />
            <div className="w-5 h-5 rounded-md bg-muted" />
            <div className="w-5 h-5 rounded-md bg-muted" />
            <div className="w-5 h-5 rounded-md bg-muted" />
          </div>
        </div>
        <div className={"w-full h-fit gap-4 flex items-center justify-between"}>
          <div className="w-fit h-fit flex items-center gap-2">
            <span className="text-sm text-muted-foreground">@2024 Frame</span>
          </div>
          <div className="w-fit h-fit flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ресурсы</span>
            <span className="text-sm text-muted-foreground">Тэги</span>
            <span className="text-sm text-muted-foreground">Команда</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer