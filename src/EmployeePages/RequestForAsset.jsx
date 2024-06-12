import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

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
            asset?.productName?.toLowerCase().includes(searchTerm)
        )
        .filter((asset) =>
            stockFilter ? asset.stockStatus === stockFilter : true
        )
        .filter((asset) =>
            assetTypeFilter ? asset.productType === assetTypeFilter : true
        );

    const handleRequest = e => {
        e.preventDefault();
        if (!selectedAsset) {
            Swal.fire({
                title: 'Error!',
                text: 'No asset selected!',
                icon: 'error',
                confirmButtonText: 'Close'
            });
            return;
        }
        const id = selectedAsset._id;
        const name = selectedAsset.productName;
        const type = selectedAsset.productType;
        const username = user.displayName;
        const useremail = user.email;
        const currentDate = new Date().toISOString();
        const request = {
            ProductId: id,
            ProductName: name,
            ProductType: type,
            UserEmail: useremail,
            UserName: username,
            Notes: additionalNotes,
            RequestDate: currentDate,
            RequestStatus: "Pending"
        };
        console.log(request);
        fetch('https://assettrack-pro-server.vercel.app/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your request has been placed!',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to place the request.',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            });
    };

    const handleAssetSelection = asset => {
        setSelectedAsset(asset);
    };

    return (
        <div>
            <Helmet>
                <title>Request for Asset</title>
            </Helmet>
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
                        <form onSubmit={handleRequest} className="modal-box">
                            <div className="">
                                <label className="form-control w-full my-4">
                                    <div className="label">
                                        <span className="label-text text-xl font-semibold">Product Id</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Product Id"
                                        name="id"
                                        defaultValue={selectedAsset._id}
                                        readOnly
                                        className="input input-bordered w-full"
                                    />
                                </label>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text text-xl font-semibold">Product Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        name="name"
                                        defaultValue={selectedAsset.productName}
                                        readOnly
                                        className="input input-bordered w-full"
                                    />
                                </label>
                                <label className="form-control w-full my-4">
                                    <div className="label">
                                        <span className="label-text text-xl font-semibold">Product Type</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Product Type"
                                        name="type"
                                        defaultValue={selectedAsset.productType}
                                        readOnly
                                        className="input input-bordered w-full"
                                    />
                                </label>
                            </div>
                            <div className="flex gap-6 mt-4">
                                <label className="form-control w-full">
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
                            <input
                                type="submit"
                                value="Request Asset"
                                className="btn bg-red-100 w-full mt-6 text-xl font-semibold"
                            />
                            <div className="modal-action justify-center">
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
