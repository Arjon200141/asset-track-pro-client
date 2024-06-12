import { useContext } from "react";
import { FaHome, FaList } from "react-icons/fa";
import { MdRequestPage } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import { IoIosAddCircle } from "react-icons/io";
import { GrUserWorker } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import { Helmet } from "react-helmet-async";

const HRDashBoard = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="md:flex md:flex-row cinzel-font">
            <Helmet>
                <title>HR Dashboard</title>
            </Helmet>
            <div className="md:w-64 min-h-screen bg-cyan-50 border-r-2 border-black md:mx-4">
                <div className="md:p-6">
                    <p>{user.companyName}</p>
                    <img src={user.companyLogo} alt='' className="w-24 h-24" />
                </div>
                <ul className="space-y-3 py-8 md:pl-6 text-lg">
                    <li className="flex items-center gap-2">
                        <FaHome />
                        <NavLink to="/dashboard/hrhome">HR HOME</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaList />
                        <NavLink to="/dashboard/assetlist">Asset List</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <IoIosAddCircle />
                        <NavLink to="/dashboard/addasset">Add an Asset</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <MdRequestPage />
                        <NavLink to="/dashboard/allrequest">All Request</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <GrUserWorker />
                        <NavLink to="/dashboard/myemployee">MY Employee</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <IoIosAddCircle />
                        <NavLink to="/dashboard/addemployee">Add Employee</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <ImProfile />
                        <NavLink to="/dashboard/profile">Profile</NavLink>
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

export default HRDashBoard;
