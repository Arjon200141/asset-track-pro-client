import { Helmet } from "react-helmet-async";
import FAQs from "./FAQs";
import Feedback from "./Feedback";
import HRPendingReq from "./HRPendingReq";
import Limited from "./Limited";
import TopReq from "./TopReq";

const HRHome = () => {
    return (
        <div>
            <Helmet>
                <title>HR Home</title>
            </Helmet>
            <HRPendingReq></HRPendingReq>
            <TopReq></TopReq>
            <Limited></Limited>
            <FAQs></FAQs>
            <Feedback></Feedback>
        </div>
    );
};

export default HRHome;