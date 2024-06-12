
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosPublic from "../Axios/useAxiosPublic";
import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";

const JoinEmployee = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, setUserRole } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;

            await updateUserProfile(data.name, data.profilePhoto);
            const userInfo = {
                user: loggedUser,
                userId: loggedUser.uid,
                role: 'employee',
                email: data.email,
                name: data.name,
                profilePhoto: data.profilePhoto,
                dateOfBirth: data.date
            };

            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    title: "Account Registered!",
                    text: "Employee Registration Successfully!!!",
                    icon: "success"
                });
                setUserRole(userInfo.role);
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
    };

    return (
        <div className="bg-sky-50">
            <Helmet>
                <title>Join as Employee</title>
            </Helmet>
            <div className="mx-80 py-12">
                <div className="hero min-h-screen">
                    <div className="w-full shadow-2xl bg-sky-100 rounded-xl">
                        <h2 className="text-4xl font-semibold text-center mt-8">Register a New Employee</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="Employee Name" className="input input-bordered" />
                                {errors.name && <span className='ml-4 text-lg font-medium text-orange-400'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Photo</span>
                                </label>
                                <input type="text" name="profilePhoto" {...register("profilePhoto", { required: true })} placeholder="Profile Photo URL" className="input input-bordered" />
                                {errors.profilePhoto && <span className='ml-4 text-lg font-medium text-orange-400'>Profile Photo is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className='ml-4 text-lg font-medium text-orange-400'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password", { required: true })} placeholder="Password" className="input input-bordered" />
                                {errors.password && <span className='ml-4 text-lg font-medium text-orange-400'>Password is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date of Birth</span>
                                </label>
                                <input type="date" name="date" {...register("date", { required: true })} className="input input-bordered" />
                                {errors.date && <span className='ml-4 text-lg font-medium text-orange-400'>Date of Birth is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-lime-300 text-2xl font-semibold py-2">Sign Up</button>
                            </div>
                            <p className="text-xl font-medium text-center mt-6">Or Continue With</p>
                        </form>
                        <SocialLogin role="employee" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinEmployee;
