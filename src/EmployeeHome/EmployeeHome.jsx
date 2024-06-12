import Calendar from "./Calender";
import Events from "./Events";
import MonthlyReq from "./MonthLyReq";
import MyPending from "./MyPending";
import Notice from "./Notice";

const EmployeeHome = () => {
    return (
        <div>
            <MyPending></MyPending>
            <MonthlyReq></MonthlyReq>
            <div className="m-8 my-16">
                <Calendar></Calendar>
            </div>
            <Notice></Notice>
            <Events></Events>
        </div>
    );
};

export default EmployeeHome;