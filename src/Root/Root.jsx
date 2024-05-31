import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="merriweather-font">
            <Outlet></Outlet>
        </div>
    );
};

export default Root;