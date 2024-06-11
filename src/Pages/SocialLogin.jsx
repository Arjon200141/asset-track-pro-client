import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../Providers/AxiosInstance/axiosinstance";

const SocialLogin = ({ role }) => {
    const { signInWithGoogle, setUserRole } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogIn = async () => {
        try {
            const result = await signInWithGoogle();
            const loggedUser = result.user;
            console.log(loggedUser);
            const userInfo = {
                userId: loggedUser.uid,
                role: role,
                email: loggedUser.email,
                name: loggedUser.displayName
            };

            loggedUser.getIdToken().then(async (token) => {
                try {
                    const res = await axiosInstance.post('/users', userInfo, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (res.data.insertedId) {
                        console.log("User Added to Database");
                        Swal.fire({
                            title: "Account Registered!",
                            text: `${role.charAt(0).toUpperCase() + role.slice(1)} Registration Successfully!!!`,
                            icon: "success"
                        });
                        setUserRole(userInfo.role);
                        navigate('/');
                    } else if (res.data.message === 'User cannot switch roles') {
                        Swal.fire({
                            title: "Registration Failed",
                            text: "You cannot switch roles.",
                            icon: "error"
                        });
                    } else if (res.data.message === 'User Already Exists') {
                        Swal.fire({
                            title: "User Exists",
                            text: "User Already Exists.",
                            icon: "info"
                        });
                        setUserRole(role);
                        navigate('/');
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "Registration Failed",
                        text: "An error occurred during registration. Please try again.",
                        icon: "error"
                    });
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Login Failed",
                text: "An error occurred during login. Please try again.",
                icon: "error"
            });
        }
    };

    return (
        <div>
            <div className="divider"></div>
            <div className="mb-6 flex justify-center items-center">
                <button onClick={handleGoogleLogIn} className="btn mr-4 h-16 px-6 py-1 md:ml-8 text-lg font-medium">
                    <img src="https://i.ibb.co/LdbG43L/google-symbol.png" alt="" className="h-10 w-10" />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
