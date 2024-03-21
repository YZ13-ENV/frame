"use client"

import { useState } from "react"
import ScrollSection from "./scroll-section"

const ScrollSide = () => {
  const [selectedSection, setSelectedSection] = useState<string>("overview")
  const sections = [
    {
      value: "overview",
      name: "Обзор"
    },
    {
      value: "content",
      name: "Контент"
    },
    {
      value: "more-from-author",
      name: "Больше от автора"
    },
  ]
  return (
    <aside className="w-36 h-fit md:flex hidden shrink-0 flex-col gap-4 sticky top-0 pt-6">
      <div className="flex flex-col gap-2 relative">
        {
          sections.map(section =>
            <ScrollSection
              key={section.name + "-" + section.value}
              onInView={res => {
                if (res.ratio === 1) setSelectedSection(res.id)
              }}
              selected={selectedSection === section.value}
              elementId={section.value}
              name={section.name}
            />
          )
        }
        <div className="absolute top-0 w-1 bg-muted/70 h-full rounded-sm" />
      </div>
      {/* <button className="w-full h-9 rounded-sm bg-muted !bg-opacity-60" /> */}
    </aside>
  )
}
export default ScrollSide