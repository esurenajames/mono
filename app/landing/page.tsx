import Hero from "./components/Hero";
import About from "./components/About";
import ExperienceSound from "./components/ExperienceSound";
import ActiveLifestyle from "./components/ActiveLifestyle";
import BuyNow from "./components/BuyNow";
import TechSpecs from "./components/TechSpecs";
import Blog from "./components/Blog";
import Recommendations from "./components/Recommendations";
import ShopNow from "./components/ShopNow";

export default function Landing() {
    return (
        <>
            <Hero />
            <About />
            <ActiveLifestyle />
            <BuyNow />
            <Recommendations />
            <Blog />
            <TechSpecs />
            <ShopNow />
        </>
    );
}
