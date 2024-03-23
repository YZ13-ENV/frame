import { Suspense } from "react"
import ColorExtractor from "../_components/color-extractor"
const page = () => {
  const paths = [
    "/wallpapers/light-wallpaper-16-9.png",
    "/wallpapers/dark-wallpaper-16-9.png",
    "/wallpapers/iphone-like-red.jpg",
    "/wallpapers/macos-monterey-1.jpg",
    "/wallpapers/macos-monterey-2.jpg",
    "/wallpapers/macos-monterey-3.jpg",
    "/wallpapers/macos-monterey-4.jpg",
    "/wallpapers/macos-monterey-5.jpg",
    "/wallpapers/macos-monterey-6.jpg",
    "/wallpapers/macos-monterey-7.jpg",
    "/wallpapers/macos-monterey-8.jpg",
    "/wallpapers/macos-monterey-9.jpg",
    "/wallpapers/macos-monterey-10.jpg",
    "/wallpapers/macos-monterey-11.jpg",
    "/wallpapers/macos-monterey-12.jpg",
    "/wallpapers/macos-monterey-13.jpg",
    "/wallpapers/macos-monterey-14.jpg",
    "/wallpapers/blue.jpg",
    "/wallpapers/orange.jpg",
    "/wallpapers/red.jpg",
    "/wallpapers/pink.png",
    "/wallpapers/yellow.jpg",
    "/wallpapers/sky.jpg",
    "/wallpapers/black-lines.jpg",
    "/wallpapers/red-lines.jpg",
    "/wallpapers/red-strokes.png",
    "/wallpapers/sphere-blue.jpg",
    "/wallpapers/sphere-red.jpg",
    "/wallpapers/wave-green.png",
    "/wallpapers/wave-light-blue.png",
    "/wallpapers/windows-pink.png",
    "/wallpapers/windows-red.png",
  ]
  return (
    <>
      {/* <Header /> */}
      <div className="w-full flex flex-col gap-3 py-12 items-center justify-center">
        <h1 className="text-center">DynamicColor</h1>
        <span className="text-sm text-center max-w-4xl">
          DynamicColor - поможет разнообразить страницы работ, адаптировав страницу под цветовую палитру главного
          блока, ниже вы можете увидеть библиотеку примеров работы DynamicColor.
          DynamicColor, извлекает основные цвета из картинки и генерирует несколько палитр, можно выбрать наиболее
          подходящую и она будет применена для страницы&nbsp;работы
        </span>
      </div>
      <div className="w-full p-3 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-auto">
        {
          paths.map(path =>
            <Suspense fallback={"loading..."}>
              <ColorExtractor key={path} src={path} />
            </Suspense>
          )
        }
      </div>
    </>
  )
}

export default page