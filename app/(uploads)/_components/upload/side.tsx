import SideHeader from "./header"
import ToolKit from "./took-kit"

const Side = () => {
    return (
        <div className={`w-72 absolute top-0 left-0 h-screen flex flex-col`}>
            <SideHeader />
            <div className="w-full h-full flex px-6 gap-10">
                <ToolKit />
            </div>
        </div>
    )
}

export default Side