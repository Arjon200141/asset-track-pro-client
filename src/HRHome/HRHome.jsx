import HRPendingReq from "./HRPendingReq";
import Limited from "./Limited";
import TopReq from "./TopReq";

const HRHome = () => {
    return (
        <div>
            <HRPendingReq></HRPendingReq>
            <TopReq></TopReq>
            <Limited></Limited>
        </div>
    );
};

export default HRHome;