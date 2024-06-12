import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/yXwzVzx/businesspeople-having-good-time-meeting-1098-1786.jpg)' }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md md:mt-72">
                                <p className="mb-5">Easily manage and track your assigned assets with AssetTrack Pro. Stay organized and ensure proper usage of company resources.</p>
                                <Link to="/employeejoin">
                                <button className="btn btn-primary">Join as Employee</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/zSwbS9T/medium-shot-smiley-man-sitting-desk-23-2149927603.jpg)' }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md md:mt-72">
                                <p className="mb-5">Simplify asset tracking and management for your team with AssetTrack Pro. Gain insights and control over both returnable and non-returnable assets efficiently.</p>
                                <Link to="/hrjoin">
                                <button className="btn btn-primary">Join as HR Manager</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;