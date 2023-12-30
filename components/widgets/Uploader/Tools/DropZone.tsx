'use client'

type Props = {
    onFile: (file: File) => void
}
const DropZone = ({ onFile }: Props) => {
    const onDrop = (e: React.DragEvent<HTMLInputElement>) => {
        e.stopPropagation()
        const file = e.currentTarget.files[0]
        if (file) onFile(file)
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        const file = e.currentTarget.files[0]
        if (file) onFile(file)
    }
    return (
        <input type="file" multiple={false} onDrop={onDrop} onChange={onChange} className='w-full h-full opacity-0' />
    )
}

export default DropZone