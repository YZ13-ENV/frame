
const Description = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-lg gap-6 h-fit">
            <span className='text-sm text-center'>
                Нажмите и выберите файл, или перенесите сюда файл для загрузки.
                Также убедитесь что файл подходит по условиям ниже.
            </span>
            <div className="grid w-full grid-cols-2 grid-rows-1 px-0">
                <div className="w-full h-full p-2">
                    <ul>
                        <li className='mb-4 text-sm text-muted-foreground'>Формат файла должен быть .JPG .PNG .MP4</li>
                        <li className='mb-4 text-sm text-muted-foreground'>Файл должен быть не более 10МБ</li>
                    </ul>
                </div>
                <div className="w-full h-full p-2">
                    <ul>
                        <li className='mb-4 text-sm text-muted-foreground'>Желательно чтобы соотношение сторон было 16:9</li>
                        <li className='mb-4 text-sm text-muted-foreground'>Файл должен принадлежать вам или команде с который вы работаете (воровать плохо).</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Description