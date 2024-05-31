const Packages = () => {
    return (
        <div>
            <h2 className="text-4xl font-semibold mb-8 text-center">Packages We Have</h2>
            <p className="text-xl mb-12 text-center mx-10 text-gray-500">Choose from a range of subscription plans tailored to fit the size and needs of your business, ensuring you only pay for what you use.From returnable tech equipment to non-returnable office supplies, our packages provide complete tracking solutions for all your company assets.</p>
            <div className="grid grid-cols-3 gap-6 mt-8 mx-8 py-12">
                <div className="card  bg-sky-100 shadow-2xl">
                    <div className="card-body space-y-3">
                        <h2 className="text-center text-3xl font-semibold">Starter Package</h2>
                        <p className="text-xl pr-4">Ideal for small teams, this package provides comprehensive asset tracking for up to 5 employees.</p>
                       
                            <p className="text-xl"><span className="font-semibold">Employee :</span> Maximum 5 employees</p>
                            <p className="text-xl"><span className="font-semibold">Price :</span> 5$</p>
                       
                        <div className="card-actions justify-end">
                            <button className="btn w-full bg-lime-200">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card  bg-sky-100 shadow-2xl">
                    <div className="card-body space-y-3">
                        <h2 className="text-center text-3xl font-semibold">Growth Package</h2>
                        <p className="text-xl pr-4">Perfect for growing businesses, this package offers asset management for up to 10 employees.</p>
                        
                            <p className="text-xl"><span className="font-semibold">Employee :</span> Maximum 10 employees</p>
                            <p className="text-xl"><span className="font-semibold">Price :</span> 8$</p>
                        
                        <div className="card-actions justify-end">
                            <button className="btn w-full bg-lime-200">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-sky-100 shadow-2xl">
                    <div className="card-body space-y-3">
                        <h2 className="text-3xl font-semibold text-center">Business Package</h2>
                        <p className="text-xl pr-4">Designed for larger teams, this package ensures efficient asset tracking for up to 20 employees.</p>
                        
                            <p className="text-xl"><span className="font-semibold">Employee :</span> Maximum 20 employees</p>
                            <p className="text-xl"><span className="font-semibold">Price :</span> 15$</p>
                       
                        <div className="card-actions justify-end">
                            <button className="btn w-full bg-lime-200">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packages;