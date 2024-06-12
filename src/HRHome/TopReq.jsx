import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TopReq= () => {
    const [topItems, setTopItems] = useState([]);

    useEffect(() => {
        fetchTopRequestedItems();
    }, []);

    const fetchTopRequestedItems = async () => {
        try {
            const response = await fetch("https://assettrack-pro-server.vercel.app/allrequests");
            const requests = await response.json();
            const pendingRequests = requests.filter(request => request.RequestStatus === "Pending");

            const requestCounts = {};
            pendingRequests.forEach(request => {
                if (requestCounts[request.ProductId]) {
                    requestCounts[request.ProductId]++;
                } else {
                    requestCounts[request.ProductId] = 1;
                }
            });

            const sortedItems = Object.entries(requestCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4)
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
        <div className="bg-teal-50">
            <div className="md:m-12 py-12 md:pl-44">
                <h2 className="md:text-4xl font-semibold text-center my-8">Top Most Requested Items</h2>
                <div className="overflow-x-auto md:mx-12 mt-6">
                    <table className="table md:table-lg">
                        <thead>
                            <tr className="md:text-xl">
                                <th>Serial No</th>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Request Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
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



