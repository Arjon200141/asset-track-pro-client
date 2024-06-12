import { FaHome, FaList } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { RiTeamLine } from "react-icons/ri";

const EmployeeDashBoard = () => {
    return (
        <div className="md:flex md:flex-row cinzel-font">
            <div className="md:w-64 min-h-screen bg-cyan-50 border-r-2 border-black mx-4">
                <ul className="space-y-3 py-8 pl-6 text-lg mt-6">
                    <li className="flex items-center gap-2">
                        <FaHome />
                        <NavLink to="/employeedashboard/emphome">Employee Home</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaList />
                        <NavLink to="/employeedashboard/myassets">My Assets</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <IoIosAddCircle />
                        <NavLink to="/employeedashboard/request">Request For an Asset</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <RiTeamLine />
                        <NavLink to="/employeedashboard/myteam">My Team</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <ImProfile />
                        <NavLink to="/employeedashboard/eployeeprofile">Profile</NavLink>
                    </li>

                    <div className="divider pr-6"></div>

                    <li className="flex items-center gap-2 my-8">
                        <FaHome />
                        <NavLink to="/">HOME</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default EmployeeDashBoard;
