import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const Navbar = () => {

    const { user, userRole, logOut } = useContext(AuthContext);
    console.log(userRole);
    const navlinks = <>
        <Link to="/"> <li><a>Home</a></li></Link>
        <Link to='/employeejoin'><li><a>Join as Employee</a></li></Link>
        <Link to='/hrjoin'><li><a>Join as HR Manager</a></li></Link>
    </>
    const navlinksemployees = <>
        <li><a>Home</a></li>
        <li><a> My Assets</a></li>
        <li><a>My Team</a></li>
        <li><a>Request for an Asset</a></li>
        <li><a>Profile</a></li>
    </>
    const navlinkshr = <>
        <li><a>Home</a></li>
        <li><a>Asset List</a></li>
        <li><a>Add an Asset</a></li>
        <li><a>All Requests</a></li>
        <li><a>Custom Requests List</a></li>
        <li><a>My Employee List</a></li>
        <li><a>Add an Employee</a></li>
        <li><a>Profile</a></li>
    </>

    const handleLogOut = () => {
        logOut();
    }

    return (
        <div className="navbar bg-sky-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="text-xl font-medium menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {user?.userRole == 'hr' ? navlinkshr :
                            userRole == 'employee' ? navlinksemployees :
                                navlinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-3xl font-bold"><span className="text-red-600">AssetTrack</span> Pro</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="ml-20 gap-4 text-2xl font-medium menu menu-horizontal px-1">
                    {user?.userRole === 'hr' ? navlinkshr :
                        userRole === 'employee' ? navlinksemployees :
                            navlinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <Link onClick={handleLogOut} className="text-2xl font-medium mr-20"><a>Log Out</a></Link> :
                        <Link to='/login' className="text-2xl font-medium mr-20"><a>Log In</a></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;