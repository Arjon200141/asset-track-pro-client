const JoinEmployee = () => {
    return (
        <div className="bg-sky-50">
            <div className="mx-80 py-12 ">
            <div className="hero min-h-screen  ">
                <div className=" w-full shadow-2xl bg-blue-100 rounded-xl">
                    <h2 className="text-4xl font-semibold text-center mt-8">Register a New Employee Here</h2>
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Employee Name" className="input input-bordered" required />
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
                        <div className="form-control mt-6">
                            <button className="btn bg-sky-300 text-2xl font-semibold py-2">Sign Up</button>
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

export default JoinEmployee;