import { useEffect, useState } from "react";

const HRPendingReq = () => {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const fetchPendingRequests = async () => {
        try {
            const response = await fetch("http://localhost:4000/allrequests?status=Pending");
            const data = await response.json();
            setPendingRequests(data);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
        }
    };

    return (
        <div className="bg-orange-50">
            <div className="py-10 px-16 mb-20">
            <h2 className="text-4xl font-semibold text-center my-12">Pending Requests (Max: 5 items)</h2>
            <div className="overflow-x-auto">
                <table className="table table-lg">
                    <thead>
                        <tr className="text-xl">
                            <th>Employee</th>
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Request Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.slice(0, 5).map((request, index) => (
                            <tr key={index}>
                                <td>{request.UserName}</td>
                                <td>{request.ProductName}</td>
                                <td>{request.ProductType}</td>
                                <td>{new Date(request.RequestDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default HRPendingReq;
