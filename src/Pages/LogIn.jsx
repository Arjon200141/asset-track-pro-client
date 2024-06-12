import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

const LogIn = () => {
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const { signIn, setUserRole, userRole } = useContext(AuthContext);

    useEffect(() => {
        // Fetch users from the server
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://assettrack-pro-server.vercel.app/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };

        fetchUsers();
    }, []);

    const handleLogIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        try {
            const result = await signIn(email, password);
            const user = result.user;
            console.log(user);

            Swal.fire({
                title: "Logged In!",
                text: "You have Logged In Successfully!!!",
                icon: "success"
            });

            const match = users.find(item => item.userId === user.uid);
            if (match) {
                setUserRole(match.role);
                console.log(userRole);
            } else {
                console.error("User role not found");
            }

            navigate(from, { replace: true });
        } catch (error) {
            console.error("Login failed", error);
            Swal.fire({
                title: "Login Failed",
                text: "Invalid email or password",
                icon: "error"
            });
        }
    };

    return (
        <div className="hero-content py-12 bg-fuchsia-50">
            <div className="py-8 card shrink-0 w-full max-w-lg shadow-xl bg-fuchsia-100">
                <h2 data-aos="flip-left" className="text-3xl text-center font-semibold mt-4 pt-6">Log in to your account</h2>
                <form onSubmit={handleLogIn} className="card-body text-xl">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input data-aos="fade-right" type="email" name="email" placeholder="Your Email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input data-aos="fade-left" type="password" name="password" placeholder="Password" className="input input-bordered" />
                    </div>
                    <div data-aos="fade-up" className="form-control mt-6">
                        <button className="btn bg-red-300 text-lg font-medium">Log In</button>
                    </div>
                </form>

                <div className="">
                    <h2 className="text-xl font-medium text-center mb-3"> Continue With </h2>
                </div>

                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default LogIn;
