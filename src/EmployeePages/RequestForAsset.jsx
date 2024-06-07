import { useLoaderData } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";

const RequestForAsset = () => {
    const assetData = useLoaderData();
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("");
    const [assetTypeFilter, setAssetTypeFilter] = useState("");
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const { user } = useContext(AuthContext);

    const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleStockFilter = (e) => setStockFilter(e.target.value);
    const handleAssetTypeFilter = (e) => setAssetTypeFilter(e.target.value);

    const filteredData = assetData
        .filter((asset) =>
            asset.productName.toLowerCase().includes(searchTerm)
        )
        .filter((asset) =>
            stockFilter ? asset.stockStatus === stockFilter : true
        )
        .filter((asset) =>
            assetTypeFilter ? asset.productType === assetTypeFilter : true
        );

    const handleRequest = e => {
        e.preventDefault();
        const id = selectedAsset.id;
        const name = selectedAsset.productName;
        const username = user.displayName;
        const useremail = user.email;
        const currentDate = new Date().toISOString();
        const request = {
            ServiceId: id,
            ServiceName: name,
            UserEmail: useremail,
            UserName: username,
            Notes: additionalNotes,
            RequestDate: currentDate,
        };
        console.log(request);
        fetch('https://mern-verse-server.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(res => {
                res.json()
                Swal.fire({
                    title: 'Success!',
                    text: 'Your Booking Has been Confirmed!!!',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const handleAssetSelection = asset => {
        setSelectedAsset(asset);
    };

    return (
        <div>
            <Navbar />
            <div className="p-4 bg-fuchsia-50 pl-40">
                <h2 className="text-4xl font-semibold text-center">All Assets</h2>
                <div className="flex flex-col justify-center md:flex-row gap-4 my-10">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        className="p-2 border border-gray-300 rounded"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={stockFilter}
                        onChange={handleStockFilter}
                    >
                        <option value="">All Stock Statuses</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={assetTypeFilter}
                        onChange={handleAssetTypeFilter}
                    >
                        <option value="">All Asset Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                </div>
                <div className="overflow-x-auto mx-12">
                    <table className="table table-lg">
                        <thead>
                            <tr className="text-xl">
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Stock Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((asset, index) => (
                                <tr key={index}>
                                    <td>{asset.productName}</td>
                                    <td>{asset.productType}</td>
                                    <td>{asset.stockStatus}</td>
                                    <td>
                                        <label
                                            htmlFor="my_modal_6"
                                            className="btn bg-blue-200"
                                            onClick={() => handleAssetSelection(asset)}
                                            disabled={asset.stockStatus === "Out of Stock"}
                                        >
                                            Request Asset
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedAsset && (
                <div>
                    <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                    <div className="modal" role="dialog">
                        <form onSubmit={handleRequest} className="modal-box ">
                            <div className="flex gap-6">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text text-xl font-semibold">Product Id</span>
                                    </div>
                                    <input type="text" placeholder="Service Id" name="id" defaultValue={selectedAsset._id} readOnly className="input input-bordered w-full " />
                                </label>
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text text-xl font-semibold">Product Name</span>
                                    </div>
                                    <input type="text" placeholder="Service Name" name="name" defaultValue={selectedAsset.productName} readOnly className="input input-bordered w-full " />
                                </label>
                            </div>
                            <div className="flex gap-6">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text text-xl font-semibold">Current User Name</span>
                                    </div>
                                    <input type="text" placeholder="User Name" name="username" defaultValue={user.displayName} readOnly className="input input-bordered w-full " />
                                </label>
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text text-xl font-semibold">Current User Email</span>
                                    </div>
                                    <input type="email" placeholder="User Email" name="useremail" defaultValue={user.email} readOnly className="input input-bordered w-full " />
                                </label>
                            </div>
                            <div className="flex gap-6">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text text-xl font-semibold">Additional Notes</span>
                                    </div>
                                    <textarea
                                        placeholder="Add any additional notes here..."
                                        name="notes"
                                        value={additionalNotes}
                                        onChange={(e) => setAdditionalNotes(e.target.value)}
                                        className="input input-bordered w-full h-24"
                                    />
                                </label>
                            </div>
                            <input type="submit" value="Purchase Service" className="btn bg-red-100 w-full mt-6 text-xl font-semibold" />
                            <div className="modal-action">
                                <label htmlFor="my_modal_6" className="btn mt-6">Exit</label>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestForAsset;
