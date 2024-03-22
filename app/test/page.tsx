import ColorExtractor from "../(view)/_components/blocks/color-extractor"
const page = () => {
  const paths = [
    "/wallpapers/black-lines.jpg",
    "/wallpapers/blue.jpg",
    "/wallpapers/dark-wallpaper-16-9.png",
    "/wallpapers/iphone-like-red.jpg",
    "/wallpapers/light-wallpaper-16-9.png",
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
    "/wallpapers/orange.jpg",
    "/wallpapers/pink.png",
    "/wallpapers/red-lines.jpg",
    "/wallpapers/red-strokes.png",
    "/wallpapers/red.jpg",
    "/wallpapers/sky.jpg",
    "/wallpapers/sphere-blue.jpg",
    "/wallpapers/sphere-red.jpg",
    "/wallpapers/wave-green.png",
    "/wallpapers/wave-light-blue.png",
    "/wallpapers/windows-pink.png",
    "/wallpapers/windows-red.png",
    "/wallpapers/yellow.jpg",
  ]
  return (
    <div className="w-full p-6 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-auto gap-4">
      {
        paths.map(path =>
          <ColorExtractor key={path} src={path} />
        )
      }
    </div>
  )
}

export default page