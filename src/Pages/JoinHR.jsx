import { SlArrowDown } from "react-icons/sl";

const JoinHR = () => {
    return (
        <div className="bg-lime-50">
            <div className="mx-80 py-12 ">
            <div className="hero min-h-screen  ">
                <div className=" w-full shadow-2xl bg-lime-100 rounded-xl">
                    <h2 className="text-4xl font-semibold text-center mt-8">Register a New HR Manager</h2>
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name="name" placeholder="HR Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Company Name</span>
                            </label>
                            <input type="text" name="companyname" placeholder="Company Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Company Logo</span>
                            </label>
                            <input type="text" name="companylogo" placeholder="Company Logo URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date of Birth</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" required />
                        </div>
                        <div className="flex justify-start items-end p-0 mt-4">
                            <div className="dropdown dropdown-right">
                                <div tabIndex={0} role="button" className="w-[600px] btn text-lg"> Select a package <SlArrowDown></SlArrowDown></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] text-lg menu p-2 shadow bg-white rounded-box w-52">
                                    <li><a >5 Members for $5</a></li>
                                    <li><a>10 Members for $8</a></li>
                                    <li><a>20 Members for $15</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-lime-300 text-2xl font-semibold py-2">Sign Up</button>
                        </div>

                        <p className="text-xl font-medium text-center my-4">Or Continue With</p>

                        <div className="flex items-center justify-center">
                            <img src="https://i.ibb.co/LdbG43L/google-symbol.png" alt="" className="h-12 w-12" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default JoinHR;