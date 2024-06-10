import { useEffect, useState } from "react";

const Limited = () => {
    const [limitedStockAssets, setLimitedStockAssets] = useState([]);

    useEffect(() => {
        fetchLimitedStockAssets();
    }, []);

    const fetchLimitedStockAssets = async () => {
        try {
            const response = await fetch("http://localhost:4000/assets");
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
        <div>
            <h2 className="text-3xl font-semibold text-center">Limited Stock Items (Quantity Less Than 10)</h2>
            
                
                    <div className="overflow-x-auto mx-72 mt-6">
                    <table className="table table-lg">
                        <thead>
                            <tr className="text-xl ">
                                <th>Product Name</th>
                                <th>Product Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                        {limitedStockAssets.map((asset,index) => (
                                <tr key={index}>
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
