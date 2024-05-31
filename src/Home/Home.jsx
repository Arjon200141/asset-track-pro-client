import About from "./About";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Packages from "./Packages";

const Home = () => {
    return (
        <div className="merriweather-font">
            <Navbar></Navbar>
            <Banner></Banner>
            <About></About>
            <Packages></Packages>
        </div>
    );
};

export default Home;