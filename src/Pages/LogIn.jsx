import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

const LogIn = () => {

    const [users, setUsers] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const { signIn, setUserRole ,userRole } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Logged In !",
                    text: "You have Logged In Successfully!!!",
                    icon: "success"
                });
                navigate('/');

                const match = users.find(item => item.userId == user.uid)
                setUserRole(match.role);
                console.log(userRole);
                

                navigate(from, { replace: true });
            })
    }


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