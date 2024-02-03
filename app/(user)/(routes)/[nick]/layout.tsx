import PortfolioNav from "../../_components/nav"
import AuthorBanner from "../../_components/banner/author-banner"
import Header from "@/components/widgets/header"
import Footer from "@/components/shared/footer"
import { getPortfolio } from "@/helpers/getPortfolio"

type Props = {
    children: JSX.Element | JSX.Element[]
    params: {
        nick: string
    }
}
const layout = async({ children, params }: Props) => {
    const { nick } = params
    const portfolio = await getPortfolio(nick)
    const prefix = `/${nick}`
    if (!portfolio) return null
    return (
        <>
            <Header />
            <AuthorBanner portfolio={portfolio} />
            <div className="w-full px-6 my-6 mx-auto max-w-screen-2xl">
                <PortfolioNav layout={portfolio.type} prefix={prefix} />
            </div>
            {/* <pre>{JSON.stringify(portfolio, null, 2)}</pre> */}
            { children }
            <Footer profileMode />
        </>
    )
}

export default layout