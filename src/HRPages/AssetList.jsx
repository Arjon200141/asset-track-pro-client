import { useState, useEffect } from "react";
import useAxiosPublic from "../Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactPaginate from 'react-paginate';

const AssetList = () => {
    const [assets, setAssets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("");
    const [assetTypeFilter, setAssetTypeFilter] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // Start with page 0 (first page)
    const itemsPerPage = 7; // Number of items per page
    const axiosPublic = useAxiosPublic();

    const fetchAssets = async () => {
        try {
            const response = await axiosPublic.get("/assets");
            setAssets(response.data);
        } catch (error) {
            console.error("Error fetching assets", error);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, [axiosPublic]);

    const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleStockFilter = (e) => setStockFilter(e.target.value);
    const handleAssetTypeFilter = (e) => setAssetTypeFilter(e.target.value);
    const handleSortOption = (e) => setSortOption(e.target.value);

    const handleAssetAdded = (newAsset) => {
        setAssets([...assets, newAsset]);
    };

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`https://assettrack-pro-server.vercel.app/assets/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            fetchAssets();
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an error deleting the asset.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const filteredData = assets.filter((asset) =>
        asset.productName.toLowerCase().includes(searchTerm)
    ).filter((asset) =>
        stockFilter ? asset.stockStatus === stockFilter : true
    ).filter((asset) =>
        assetTypeFilter ? asset.productType === assetTypeFilter : true
    ).sort((a, b) => {
        if (sortOption === "quantityAsc") {
            return a.productQuantity - b.productQuantity;
        }
        if (sortOption === "quantityDesc") {
            return b.productQuantity - a.productQuantity;
        }
        return 0;
    });

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;

    const currentData = filteredData.slice(offset, offset + itemsPerPage);

    return (
        <div>
            <Helmet>
                <title>Asset List</title>
            </Helmet>
            <div className="p-4 bg-emerald-50">
                <h2 className="text-4xl font-semibold text-center">All Assets</h2>
                <div className="ml-60 flex flex-col md:flex-row gap-4 my-10">
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
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={sortOption}
                        onChange={handleSortOption}
                    >
                        <option value="">Sort by Quantity</option>
                        <option value="quantityAsc">Ascending</option>
                        <option value="quantityDesc">Descending</option>
                    </select>
                </div>
                <div className="overflow-x-auto mx-4">
                    <table className="table md:table-sm">
                        <thead>
                            <tr className="md:text-sm">
                                <th>Id</th>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Product Quantity</th>
                                <th>Stock Status</th>
                                <th>Asset Type</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((asset, index) => (
                                <tr key={index}>
                                    <td>{offset + index + 1}</td>
                                    <td>{asset.productName}</td>
                                    <td>{asset.productType}</td>
                                    <td>{asset.productQuantity}</td>
                                    <td>{asset.stockStatus}</td>
                                    <td>{asset.assetType}</td>
                                    <td>{asset.dateAdded}</td>
                                    <td className="flex gap-6 mt-4 justify-center">
                                        <Link to={`/updateasset/${asset._id}`}>
                                            <button>Update</button>
                                        </Link>
                                        <button onClick={() => handleDelete(asset._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        className="bg-green-200 py-4 px-8 rounded-xl flex gap-12 my-4 font-semibold"
                    />
                </div>
            </div>
        </div>
    );
};

export default AssetList;
