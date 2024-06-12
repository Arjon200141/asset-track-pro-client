import { useEffect, useState } from "react";

const Limited = () => {
    const [limitedStockAssets, setLimitedStockAssets] = useState([]);

    useEffect(() => {
        fetchLimitedStockAssets();
    }, []);

    const fetchLimitedStockAssets = async () => {
        try {
            const response = await fetch("https://assettrack-pro-server.vercel.app/assets");
            if (!response.ok) {
                throw new Error("Failed to fetch assets");
            }
            const assets = await response.json();
            const limitedStock = assets.filter(asset => asset.
                productQuantity < 10);
            setLimitedStockAssets(limitedStock);
        } catch (error) {
            console.error("Error fetching limited stock assets:", error);
        }
    };

    return (
        <div className="bg-blue-50 p-16 my-12">
            <h2 className="text-3xl font-semibold text-center">Limited Stock Items (Quantity Less Than 10)</h2>
                    <div className="overflow-x-auto ml-44 mt-6">
                    <table className="table table-xl">
                        <thead>
                            <tr className="text-2xl ">
                                <th>Serial No</th>
                                <th>Product Name</th>
                                <th>Product Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg">
                        {limitedStockAssets.map((asset,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{asset.productName}</td>
                                    <td>{asset.productQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
        </div>
    );
};

export default Limited;
