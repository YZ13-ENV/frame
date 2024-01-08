import { config } from "@/app.config"
import RemoteLogo from "@/components/shared/remote/remote-logo"

type Props = {
}
const SideHeader = ({  }: Props) => {
    return (
        <header className="w-fit flex items-center gap-2 py-6 px-8">
            <RemoteLogo className='z-10' dark={config.remote.logo.dark} light={config.remote.logo.light} size={32} />
            <span className="text-lg font-bold">Frame</span>
        </header>
    )
}

export default SideHeader