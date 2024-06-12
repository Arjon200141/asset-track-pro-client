import { Helmet } from "react-helmet-async";
import Calendar from "./Calender";
import Events from "./Events";
import MonthlyReq from "./MonthLyReq";
import MyPending from "./MyPending";
import Notice from "./Notice";

const EmployeeHome = () => {
    return (
        <div>
            <Helmet>
                <title>Employee Home</title>
            </Helmet>
            <MyPending></MyPending>
            <MonthlyReq></MonthlyReq>
            <div className="md:m-8 my-16">
                <Calendar></Calendar>
            </div>
            <Notice></Notice>
            <Events></Events>
        </div>
    );
};

export default EmployeeHome;