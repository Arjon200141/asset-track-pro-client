import { Helmet } from "react-helmet-async";
import About from "./About";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Packages from "./Packages";
import Footer from "./Footer";

const Home = () => {
    return (
        <div className="merriweather-font bg-sky-50">
            <Helmet>
                <title>AssetTrack Pro</title>
            </Helmet>
            <Navbar></Navbar>
            <Banner></Banner>
            <About></About>
            <Packages></Packages>
            <Footer></Footer>
        </div>
    );
};

export default Home;