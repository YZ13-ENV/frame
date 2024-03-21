"use client"

import { useDebounceEffect } from "ahooks"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  value?: string
}
const Search = ({ value }: Props) => {
  const path = decodeURIComponent(usePathname())
  const { push } = useRouter()
  useDebounceEffect(() => {
    // console.log(value)
    if (value) {
      const query = value
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll('--', '-')
      const isSearchLayout = path.startsWith("/search")
      if (isSearchLayout) {
        const newPath = path.replace(value, query)
        if (newPath === '/search') {
          push(`/search/${query}`)
        } else {
          push(newPath)
        }
      } else {
        const newPath = `/search/${query}`
        push(newPath)
      }
    }
  }, [value], { wait: 1000 })
  return <></>
}

export default Search