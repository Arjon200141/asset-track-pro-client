import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const MyPending = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchPendingRequests();
    }, [user]);

    const fetchPendingRequests = async () => {
        try {
            const response = await fetch(`https://assettrack-pro-server.vercel.app/requests?email=${user.email}`);
            const data = await response.json();
            const pending = data.filter(request => request.RequestStatus === "Pending");
            setPendingRequests(pending);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
        }
    };

    return (
        <div className=" bg-fuchsia-50 py-12 ">
            <h2 className="text-4xl font-semibold text-center">Pending Requests</h2>
            <div className="overflow-x-auto mx-12 mt-6">
                <table className="table table-lg">
                    <thead>
                        <tr className="text-xl">
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Request Date</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.map((request, index) => (
                            <tr key={index}>
                                <td>{request.ProductName}</td>
                                <td>{request.ProductType}</td>
                                <td>{new Date(request.RequestDate).toLocaleDateString()}</td>
                                <td>{request.Notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPending;
