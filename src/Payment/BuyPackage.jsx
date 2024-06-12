import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const BuyPackage = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const packages = [
        { id: 1, members: 5, price: 5 },
        { id: 2, members: 10, price: 8 },
        { id: 3, members: 20, price: 15 }
    ];

    const handlePackageSelect = (packageId) => {
        setSelectedPackage(packageId);
    };

    const handlePurchase = async () => {
        if (selectedPackage === null) {
            Swal.fire("Error", "Please select a package", "error");
            return;
        }

        try {
            const response = await axiosPublic.post("/buy-package", { packageId: selectedPackage });
            if (response.data.success) {
                Swal.fire("Success", "Package purchased successfully", "success");
                navigate("/package-section");
            }
        } catch (error) {
            console.error("Error purchasing package", error);
            Swal.fire("Error", "Could not purchase package", "error");
        }
    };

    return (
        <div>
            <Helmet>
                <title>Buy Package</title>
            </Helmet>
            <h2>Buy Package</h2>
            <div>
                {packages.map(pkg => (
                    <div key={pkg.id}>
                        <input
                            type="radio"
                            checked={selectedPackage === pkg.id}
                            onChange={() => handlePackageSelect(pkg.id)}
                        />
                        <label>
                            {pkg.members} Members for ${pkg.price}
                        </label>
                    </div>
                ))}
            </div>

            <Link to={`/payment/${packages.price}`}>
                <button onClick={handlePurchase}>Purchase</button>
            </Link>
            
        </div>
    );
};

export default BuyPackage;
