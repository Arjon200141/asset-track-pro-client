import { useState } from "react";
import useAxiosSecure from "../Axios/useAxiosSecure";

const AddAssetList = ({ onAssetAdded }) => {
    const [formData, setFormData] = useState({
        productName: "",
        productType: "", 
        productQuantity: "",
        stockStatus: "",
        assetType: "" 
    });
    const axiosSecure = useAxiosSecure();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date().toISOString();

            const newData = { ...formData, dateAdded: currentDate };

            const response = await axiosSecure.post("/assets", newData);
            if (response.status === 201) {
                onAssetAdded(response.data);
                setFormData({
                    productName: "",
                    productType: "", 
                    productQuantity: "",
                    stockStatus: "",
                    assetType: ""
                });
            }
        } catch (error) {
            console.error("Error adding asset", error);
        }
    };
    return (
        <div className="">
            <div className="bg-sky-50 py-16">
                <div className="mx-12">
                    <div className="hero min-h-screen ">
                        <div className=" w-full shadow-2xl bg-sky-100 rounded-xl">
                            <h2 className="text-4xl font-semibold text-center mt-8">Add an Asset</h2>
                            <form className="card-body" onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        placeholder="Product Name"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Type</span>
                                    </label>
                                    <select
                                        name="productType"
                                        value={formData.productType}
                                        onChange={handleChange}
                                        className="input input-bordered"
                                    >
                                        <option value="">Select Product Type</option>
                                        <option value="Returnable">Returnable</option>
                                        <option value="Non-returnable">Non-returnable</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Quantity</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="productQuantity"
                                        value={formData.productQuantity}
                                        onChange={handleChange}
                                        placeholder="Product Quantity"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Stock Status</span>
                                    </label>
                                    <select
                                        name="stockStatus"
                                        value={formData.stockStatus}
                                        onChange={handleChange}
                                        className="input input-bordered"
                                    >
                                        <option value="">Select Stock Status</option>
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Asset Type</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="assetType"
                                        value={formData.assetType}
                                        onChange={handleChange}
                                        placeholder="Asset Type"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="mb-8">
                                    <button className="btn bg-sky-200 py-1 px-6 w-full my-4 text-2xl font-semibold">Add Asset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAssetList;
