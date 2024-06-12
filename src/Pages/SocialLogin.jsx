import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../Axios/useAxiosPublic";

const SocialLogin = ({ role }) => {
    const { signInWithGoogle, setUserRole } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const loggedUser = result.user;
            const userInfo = {
                user: loggedUser,
                userId: loggedUser.uid,
                role: role,
                email: loggedUser.email,
                name: loggedUser.displayName,
                profilePhoto: loggedUser.photoURL
            };

            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId) {
                setUserRole(userInfo.role);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="text-center mt-4">
            <button onClick={handleGoogleSignIn} className="btn btn-outline text-lg font-semibold py-2">
                <FcGoogle size={24} className="mr-2" /> Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;
