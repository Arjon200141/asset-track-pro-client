const LogIn = () => {
    return (
        <div className="hero-content py-12 bg-fuchsia-50">
                <div className="py-8 card shrink-0 w-full max-w-lg shadow-xl bg-fuchsia-100">
                    <h2 data-aos="flip-left" className="text-3xl text-center font-semibold mt-4 pt-6">Log in to your account</h2>
                    <form  className="card-body text-xl">
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

                    <div className="mb-6 flex justify-center items-center">
                        <button className="btn mr-4 h-16 px-6 py-1 md:ml-8 text-lg font-medium"><img src="https://i.ibb.co/LdbG43L/google-symbol.png" alt="" className="h-10 w-10" /> </button>
                    </div>
                </div>
            </div>
    );
};

export default LogIn;