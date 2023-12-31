import { BiPlay } from 'react-icons/bi'

const VideoIndicator = () => {
    return (
        <div className='absolute z-30 transition-all top-4 right-4'>
            <BiPlay size={25}  />
        </div>
    )
}

export default VideoIndicator