import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { SlArrowDown } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosPublic from "../Axios/useAxiosPublic";
import SocialLogin from "./SocialLogin";

const JoinHR = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, setUserRole } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedPackage, setSelectedPackage] = useState(null);

    const onSubmit = async (data) => {
        if (!selectedPackage) {
            Swal.fire({
                title: "Package Required",
                text: "Please select a package.",
                icon: "warning"
            });
            return;
        }

        try {
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;

            await updateUserProfile(data.name, data.companylogo);
            const userInfo = {
                user: loggedUser,
                userId: loggedUser.uid,
                role: 'hr',
                email: data.email,
                name: data.name,
                companyName: data.companyname,
                companyLogo: data.companylogo,
                package: selectedPackage
            };

            const res = await axiosPublic.post('/users', userInfo);
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    title: "Account Registered!",
                    text: "HR Registration Successfully!!!",
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
        <div className="bg-lime-50">
            <div className="mx-80 py-12">
                <div className="hero min-h-screen">
                    <div className="w-full shadow-2xl bg-lime-100 rounded-xl">
                        <h2 className="text-4xl font-semibold text-center mt-8">Register a New HR Manager</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="HR Name" className="input input-bordered" />
                                {errors.name && <span className='ml-4 text-lg font-medium text-orange-400'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Company Name</span>
                                </label>
                                <input type="text" name="companyname" {...register("companyname", { required: true })} placeholder="Company Name" className="input input-bordered" />
                                {errors.companyname && <span className='ml-4 text-lg font-medium text-orange-400'>Company Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Company Logo</span>
                                </label>
                                <input type="text" name="companylogo" {...register("companylogo", { required: true })} placeholder="Company Logo URL" className="input input-bordered" />
                                {errors.companylogo && <span className='ml-4 text-lg font-medium text-orange-400'>Company Logo is required</span>}
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
                            <div className="flex justify-start items-end p-0 mt-4">
                                <div className="dropdown dropdown-right">
                                    <div tabIndex={0} role="button" className="w-[600px] btn text-lg" onClick={() => setSelectedPackage(null)}>
                                        Select a package <SlArrowDown />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] text-lg menu p-2 shadow bg-white rounded-box w-52">
                                        <li><a onClick={() => setSelectedPackage("5 Members for $5")}>5 Members for $5</a></li>
                                        <li><a onClick={() => setSelectedPackage("10 Members for $8")}>10 Members for $8</a></li>
                                        <li><a onClick={() => setSelectedPackage("20 Members for $15")}>20 Members for $15</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-lime-300 text-2xl font-semibold py-2">Sign Up</button>
                            </div>
                            <p className="text-xl font-medium text-center mt-6">Or Continue With</p>
                        </form>
                        <SocialLogin role="hr" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinHR;
