import PortfolioExample from '@/components/examples/portfolio-example'
import ShotsExample from '@/components/examples/shots-example'
import HeroSection from '@/components/hero'

const HomePage = () => {
    return (
        <>
            {/* <Dock /> */}
            <HeroSection />
            <PortfolioExample />
            <ShotsExample />
        </>
    )
}

export default HomePage