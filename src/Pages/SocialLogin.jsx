import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosPublic from "../Axios/useAxiosPublic";

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const handleGoogleLogIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                console.log( loggedUser);
                const userInfo = {
                    user: loggedUser,
                    userId: loggedUser.uid,
                    role: 'employee'
                }
            })
    }
    return (
        <div>
            <div className="divider"></div>
            <div className="mb-6 flex justify-center items-center">

                <button onClick={handleGoogleLogIn} className="btn mr-4 h-16 px-6 py-1 md:ml-8 text-lg font-medium"><img src="https://i.ibb.co/LdbG43L/google-symbol.png" alt="" className="h-10 w-10" /> </button>
            </div>
        </div>
    );
};

export default SocialLogin;