import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TopReq= () => {
    const [topItems, setTopItems] = useState([]);

    useEffect(() => {
        fetchTopRequestedItems();
    }, []);

    const fetchTopRequestedItems = async () => {
        try {
            const response = await fetch("http://localhost:4000/allrequests");
            const requests = await response.json();
            const pendingRequests = requests.filter(request => request.RequestStatus === "Pending");

            // Count the number of requests for each product
            const requestCounts = {};
            pendingRequests.forEach(request => {
                if (requestCounts[request.ProductId]) {
                    requestCounts[request.ProductId]++;
                } else {
                    requestCounts[request.ProductId] = 1;
                }
            });

            // Sort products based on request count
            const sortedItems = Object.entries(requestCounts)
                .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
                .slice(0, 4) // Get top 4 items
                .map(([productId, count]) => {
                    const matchingRequest = pendingRequests.find(request => request.ProductId === productId);
                    return {
                        productId,
                        productName: matchingRequest.ProductName,
                        productType: matchingRequest.ProductType,
                        requestCount: count
                    };
                });

            setTopItems(sortedItems);
        } catch (error) {
            console.error("Error fetching top requested items:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch top requested items.",
                icon: "error",
                confirmButtonText: "Close"
            });
        }
    };

    return (
        <div>
            <div className="p-4 bg-fuchsia-50 pl-40">
                <h2 className="text-4xl font-semibold text-center">Top Most Requested Items</h2>
                <div className="overflow-x-auto mx-12 mt-6">
                    <table className="table table-lg">
                        <thead>
                            <tr className="text-xl">
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Request Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.productName}</td>
                                    <td>{item.productType}</td>
                                    <td>{item.requestCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopReq;
