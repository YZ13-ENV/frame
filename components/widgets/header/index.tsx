import { Button } from "@/components/ui/button";
import { getVisitorId, preferredOrder } from "@/helpers/cookies";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BiBriefcase, BiSearch } from "react-icons/bi";
import { TbSparkles } from "react-icons/tb";

const NavSection = dynamic(() => import("./ui/nav-section"))
const UserSection = dynamic(() => import("./ui/user-section"), {
    ssr: false
})

type Props = {
    transparent?: boolean
}
const Header = ({ transparent = true }: Props) => {
    const visitor = getVisitorId()
    const sort = preferredOrder()
    return (
        <header className={cn(
            transparent ? 'bg-transparent' : 'bg-card',
            'relative w-full h-14 py-1 shrink-0 flex top-0 left-0 items-center md:!justify-center justify-between z-20'
        )}>
            <NavSection />
            <div className="flex items-center justify-center gap-1">
                <Button asChild size="sm" className="rounded-lg gap-2" variant="ghost">
                    <Link href={sort ? `/shots/${sort}` : "/shots/popular"}>
                        <TbSparkles size={16} />
                        <span className="lg:!inline md:!inline hidden">Вдохновение</span>
                    </Link>
                </Button>
                <Button asChild size="sm" className="lg:!flex md:!flex hidden rounded-lg gap-2" variant="ghost">
                    <Link href="/search">
                        <BiSearch size={16} />
                        <span className="lg:!inline md:!inline hidden">Поиск</span>
                    </Link>
                </Button>
                {
                    visitor &&
                    <>
                        <Button asChild size="sm" className="rounded-lg gap-2" variant="ghost">
                            <Link href={`/${visitor}`}>
                                <BiBriefcase size={16} />
                                <span className="lg:!inline md:!inline hidden">Портфолио</span>
                            </Link>
                        </Button>
                        {/* <Button size="sm" className="rounded-lg gap-2" variant="ghost">
                            <MdSubscriptions size={16} />
                            <span className="lg:inline md:inline hidden">Подписки</span>
                        </Button> */}
                    </>
                }
            </div>
            <UserSection />
        </header>
    )
}

export default Header