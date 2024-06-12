import HRPendingReq from "./HRPendingReq";
import Limited from "./Limited";
// import PieChart from "./PieChart";
import TopReq from "./TopReq";

const HRHome = () => {
    return (
        <div>
            <HRPendingReq></HRPendingReq>
            <TopReq></TopReq>
            <Limited></Limited>
            {/* <PieChart></PieChart> */}
        </div>
    );
};

export default HRHome;