import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BuyPackage = () => {

    const packages = useLoaderData();

    return (
        <div className="text-2xl bg-sky-50">
            <Helmet>
                <title>Buy Package</title>
            </Helmet>
            <h2 className="text-4xl font-semibold py-12 text-center">Buy Package</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mx-8 py-6">
                {packages.map(pkg => (
                    <div key={pkg._id} className="card  bg-sky-100 shadow-2xl">
                        <div className="card-body space-y-3">
                            <h2 className="text-center text-3xl font-semibold">{pkg.name}</h2>
                            <p className="text-xl pr-4">{pkg.description}</p>
                            <p className="text-xl"><span className="font-semibold">Employee : </span>Maximum {pkg.employee} Employees</p>
                            <p className="text-xl"><span className="font-semibold">Price :</span> {pkg.price} $</p>
                            <Link to={`/payment/${pkg._id}`}>
                                <button className="btn bg-blue-400 text-2xl py-2 text-white px-8">Purchase</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyPackage;
