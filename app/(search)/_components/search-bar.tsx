'use client'

import { Input } from "@/components/ui/input"
import { useDebounceEffect } from "ahooks"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
  defaultValue?: string
}
const SearchBar = ({ defaultValue }: Props) => {
  const [text, setText] = useState<string>(defaultValue ? defaultValue : '')
  const path = decodeURIComponent(usePathname())
  const { push } = useRouter()
  useDebounceEffect(() => {
    if (text !== '') {
      const query = text
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll('--', '-')
      const newPath = defaultValue ? path.replace(defaultValue, query) : path.replace(text, query)
      push(newPath)
    }
  },[text, setText], { wait: 1000 })
  return (
    <Input placeholder="Что будем искать?" value={text} onChange={e => setText(e.target.value)}
    className="text-center text-xl h-fit !border-0 !outline-none !ring-0" />
  )
}

export default SearchBar