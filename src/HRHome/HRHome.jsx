import Navbar from "../Home/Navbar";
import HRPendingReq from "./HRPendingReq";
import Limited from "./Limited";
// import PieChart from "./PieChart";
import TopReq from "./TopReq";

const HRHome = () => {
    return (
        <div>
            <Navbar></Navbar>
            <HRPendingReq></HRPendingReq>
            <TopReq></TopReq>
            <Limited></Limited>
            {/* <PieChart></PieChart> */}
        </div>
    );
};

export default HRHome;