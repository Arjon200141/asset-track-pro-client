import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const Navbar = () => {
    const { user, userRole, logOut } = useContext(AuthContext);
    const [showName, setShowName] = useState(false);

    const navlinks = (
        <>
            <li><Link to="">Home</Link></li>
            <li><Link to="/employeejoin">Join as Employee</Link></li>
            <li><Link to="/hrjoin">Join as HR Manager</Link></li>
        </>
    );

    const navlinksemployees = (
        <>
            <li><Link to="">Home</Link></li>
            <li><Link to="/myassets">My Assets</Link></li>
            <li><a>My Team</a></li>
            <li><Link to="/request">Request for an Asset</Link></li>
            <li><Link to="/eployeeprofile">Profile</Link></li>
        </>
    );

    const navlinkshr = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/assetlist">Asset List</Link></li>
            <li><Link to="/addasset">Add an Asset</Link></li>
            <li><Link to="/allrequest">All Requests</Link></li>
            <li><Link to="/myemployee">My Employee List</Link></li>
            <li><Link to="/addemployee">Add an Employee</Link></li>
            <li><a>Profile</a></li>
        </>
    );

    const handleLogOut = () => {
        logOut();
    }

    return (
        <div className="navbar bg-sky-50">
            <div className="navbar-start">
                <ul className="text-xl font-medium menu hidden menu-sm mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    {navlinkshr}
                </ul>
                <a className="btn btn-ghost text-3xl font-bold"><span className="text-red-600">AssetTrack</span> Pro</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="ml-20 gap-2 text-lg font-medium  menu menu-horizontal px-1">
                    {navlinkshr}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-3">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                            onMouseEnter={() => setShowName(true)}
                            onMouseLeave={() => setShowName(false)}
                        >
                            <div className="rounded-full">
                                <img alt="Profile" src={user.photoURL || "https://i.ibb.co/dDx1cfY/user.png"} />
                            </div>
                            {showName && <div className="absolute top-2 right-14 bg-emerald-100 shadow-md p-2 rounded-lg font-medium">{user.displayName || "Name not Found"}</div>}
                        </div>
                        <Link onClick={handleLogOut} className="text-xl font-medium"><a>Log Out</a></Link>
                    </div>
                ) : (
                    <Link to='/login' className="text-xl font-medium"><a>Log In</a></Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
