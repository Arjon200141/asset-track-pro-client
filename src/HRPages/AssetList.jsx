import { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import useAxiosPublic from "../Axios/useAxiosPublic";

const AssetList = () => {
    const [assets, setAssets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("");
    const [assetTypeFilter, setAssetTypeFilter] = useState("");
    const [sortOption, setSortOption] = useState("");
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axiosPublic.get("/assets");
                setAssets(response.data);
            } catch (error) {
                console.error("Error fetching assets", error);
            }
        };
        fetchAssets();
    }, [axiosPublic]);

    const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleStockFilter = (e) => setStockFilter(e.target.value);
    const handleAssetTypeFilter = (e) => setAssetTypeFilter(e.target.value);
    const handleSortOption = (e) => setSortOption(e.target.value);

    const handleAssetAdded = (newAsset) => {
        setAssets([...assets, newAsset]);
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

    return (
        <div>
            <Navbar />
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
                    <table className="table table-lg">
                        <thead>
                            <tr className="text-xl">
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
                            {filteredData.map((asset, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{asset.productName}</td>
                                    <td>{asset.productType}</td>
                                    <td>{asset.productQuantity}</td>
                                    <td>{asset.stockStatus}</td>
                                    <td>{asset.assetType}</td>
                                    <td>{asset.dateAdded}</td>
                                    <td className="flex gap-6 mt-4 justify-center">
                                        <button>Update</button>
                                        <button>Delete</button>
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

export default AssetList;
