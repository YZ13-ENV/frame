import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

type Props = {
    path: string
    value: string
}
const PortfolioNav = ({ path, value }: Props) => {
    return (
        <Tabs defaultValue={value}>
            <TabsList>
                <TabsTrigger value="1"><Link href={path}>Работы</Link></TabsTrigger>
                <TabsTrigger value="2"><Link href={path + '/saved'}>Сохраненные</Link></TabsTrigger>
                <TabsTrigger value="3"><Link href={path + '/bio'}>Био</Link></TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default PortfolioNav