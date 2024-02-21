'use client'

type Props = {
    onFile: (file: File) => void
    className?: string
}
const DropZone = ({ onFile, className = '' }: Props) => {
    const onCatchFile = (list: FileList | null) => {
        if (list) {
            const file = list[0]
            if (file) onFile(file)
        }
    }
    const onDrop = (e: React.DragEvent<HTMLInputElement>) => {
        e.stopPropagation()
        onCatchFile(e.currentTarget.files)
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        onCatchFile(e.currentTarget.files)
    }
    return (
        <input type="file" multiple={false} onDrop={onDrop} onChange={onChange} className={`w-full h-full opacity-0 ${className}`} />
    )
}

export default DropZone