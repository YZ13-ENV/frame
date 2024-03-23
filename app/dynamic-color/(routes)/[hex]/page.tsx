import { getDynamicColors, hexToHSL } from "@/helpers/colors"
import { redirect } from "next/navigation"
import { Button } from "../../_components/dynamic-color/button"
import Div from "../../_components/dynamic-color/div"
import H from "../../_components/dynamic-color/h"
import { Input } from "../../_components/dynamic-color/input"
import Span from "../../_components/dynamic-color/span"
type Props = {
  params: {
    hex: string
  }
  searchParams: {
    lightness: string
  }
}
const page = ({ params, searchParams }: Props) => {
  const { hex } = params
  if (hex.length > 6) return redirect("/test")
  const lightness = searchParams.lightness ? parseInt(searchParams.lightness) : .5
  const validHEX = `#${hex}`
  const { ui } = getDynamicColors(
    validHEX, { lightness: lightness }
  )
  return (
    <Div variables={ui} className="p-6 w-full min-h-screen flex flex-col items-center gap-4 bg-background-dynamic/10">
      <h1 className="text-center">{validHEX}</h1>
      <span className="text-center">{hexToHSL(validHEX)}</span>
      <div className="w-full flex flex-col gap-6 items-center">
        <div className="w-full flex flex-col gap-2">
          <H size={1} variables={ui}>Darkmaterial</H>
          <H size={2} variables={ui}>Darkmaterial</H>
          <H size={3} variables={ui}>Darkmaterial</H>
          <H size={4} variables={ui}>Darkmaterial</H>
          <H size={5} variables={ui}>Darkmaterial</H>
          <H size={6} variables={ui}>Darkmaterial</H>
        </div>
        <div className="w-full flex items-center gap-2">
          <Span variant="primary" variables={ui}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Span>
          <Span variant="secondary" variables={ui}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Span>
        </div>
        <div className="w-full flex items-start gap-6">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Button variant="default" variables={ui}>Кнопка</Button>
              <Button variant="secondary" variables={ui}>Кнопка</Button>
              <Button variant="outline" variables={ui}>Кнопка</Button>
              <Button variant="ghost" variables={ui}>Кнопка</Button>
              <Button variant="link" variables={ui}>Кнопка</Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button disabled variant="default" variables={ui}>Кнопка</Button>
              <Button disabled variant="secondary" variables={ui}>Кнопка</Button>
              <Button disabled variant="outline" variables={ui}>Кнопка</Button>
              <Button disabled variant="ghost" variables={ui}>Кнопка</Button>
              <Button disabled variant="link" variables={ui}>Кнопка</Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="rounded-full" variant="default" variables={ui}>Кнопка</Button>
              <Button className="rounded-full" variant="secondary" variables={ui}>Кнопка</Button>
              <Button className="rounded-full" variant="outline" variables={ui}>Кнопка</Button>
              <Button className="rounded-full" variant="ghost" variables={ui}>Кнопка</Button>
              <Button className="rounded-full" variant="link" variables={ui}>Кнопка</Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="rounded-full" disabled variant="default" variables={ui}>Кнопка</Button>
              <Button className="rounded-full" disabled variant="secondary" variables={ui}>Кнопка</Button>
              <Button className="rounded-full" disabled variant="outline" variables={ui}>Кнопка</Button>
              <Button className="rounded-full" disabled variant="ghost" variables={ui}>Кнопка</Button>
              <Button className="rounded-full" disabled variant="link" variables={ui}>Кнопка</Button>
            </div>
          </div>
        </div>
        <Input variables={ui} placeholder="Текст" />
        <Input disabled variables={ui} placeholder="Текст" />
      </div>

    </Div>
  )
}

export default page