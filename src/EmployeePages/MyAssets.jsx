import Navbar from "../Home/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyAssets = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [assetTypeFilter, setAssetTypeFilter] = useState("");
    const [requestStatusFilter, setRequestStatusFilter] = useState("");

    const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleAssetTypeFilter = (e) => setAssetTypeFilter(e.target.value);
    const handleRequestStatusFilter = (e) => setRequestStatusFilter(e.target.value);

    const { data: assets = [], refetch } = useQuery({
        queryKey: ['assets', user?.email, searchTerm, assetTypeFilter, requestStatusFilter],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests`, {
                params: {
                    email: user.email,
                    searchTerm,
                    assetTypeFilter,
                    requestStatusFilter
                }
            });
            return res.data;
        }
    });

    const handleCancel = async (id) => {
        try {
            await axiosSecure.post('/cancelRequest', { id });
            Swal.fire({
                title: 'Success!',
                text: 'Request has been cancelled',
                icon: 'success',
                confirmButtonText: 'Close'
            });
            refetch();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to cancel request',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        }
    };

    const handleReturn = async (id) => {
        try {
            await axiosSecure.post('/returnAsset', { id });
            Swal.fire({
                title: 'Success!',
                text: 'Asset has been returned',
                icon: 'success',
                confirmButtonText: 'Close'
            });
            refetch();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to return asset',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        }
    };

    return (
        <div>
            <Navbar />
            <div className="bg-sky-100 py-12">
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
                        value={assetTypeFilter}
                        onChange={handleAssetTypeFilter}
                    >
                        <option value="">All Asset Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={requestStatusFilter}
                        onChange={handleRequestStatusFilter}
                    >
                        <option value="">All Request Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Returned">Returned</option>
                    </select>
                </div>

                <div className="overflow-x-auto mx-12">
                    <table className="table table-lg">
                        <thead>
                            <tr className="text-xl">
                                <th>Asset Name</th>
                                <th>Asset Type</th>
                                <th>Request Date</th>
                                <th>Approval Date</th>
                                <th>Request Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset) => (
                                <tr key={asset._id}>
                                    <td>{asset.ProductName}</td>
                                    <td>{asset.ProductType}</td>
                                    <td>{new Date(asset.RequestDate).toLocaleDateString()}</td>
                                    <td>{asset.ApprovalDate ? new Date(asset.ApprovalDate).toLocaleDateString() : "N/A"}</td>
                                    <td>{asset.RequestStatus}</td>
                                    <td>
                                        {asset.RequestStatus === "Pending" ? (
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => handleCancel(asset._id)}
                                            >
                                                Cancel
                                            </button>
                                        ) : asset.RequestStatus === "Approved" && asset.ProductType === "Returnable" ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleReturn(asset._id)}
                                                disabled={asset.RequestStatus === "Returned"}
                                            >
                                                Return
                                            </button>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyAssets;
