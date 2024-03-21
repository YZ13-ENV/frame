"use client"
import Search from "@/components/shared/search"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import CategoryTabs from "./category-tabs"

type Props = {
  defaultValue?: string
}
const SearchBox = ({ defaultValue }: Props) => {
  const [query, setQuery] = useState<string>(defaultValue ? defaultValue : '')
  return (
    <div className="max-w-xl w-full mx-auto h-fit rounded-2xl bg-card p-3 flex flex-col gap-2 border">
      <Search value={query} />
      <div className="w-full h-9 flex items-center gap-0">
        <BiSearch
          className="text-muted-foreground"
          size={20}
        />
        <Input
          placeholder="Поиск"
          className="!border-0 !ring-0 !outline-none text-base"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <CategoryTabs />
    </div>
  )
}

export default SearchBox