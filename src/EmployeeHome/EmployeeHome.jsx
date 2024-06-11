import Navbar from "../Home/Navbar";
import MonthlyReq from "./MonthLyReq";
import MyPending from "./MyPending";

const EmployeeHome = () => {
    return (
        <div>
            <Navbar></Navbar>
            <MyPending></MyPending>
            <MonthlyReq></MonthlyReq>
            
        </div>
    );
};

export default EmployeeHome;