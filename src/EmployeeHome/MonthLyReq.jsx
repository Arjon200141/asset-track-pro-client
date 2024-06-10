import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const MonthlyReq = () => {
    const { user } = useContext(AuthContext);
    const [monthlyRequests, setMonthlyRequests] = useState([]);

    useEffect(() => {
        fetchMonthlyRequests();
    }, [user]);

    const fetchMonthlyRequests = async () => {
        try {
            const response = await fetch(`http://localhost:4000/requests?email=${user.email}`);
            const data = await response.json();
            const currentMonth = new Date().getMonth(); 
            const currentYear = new Date().getFullYear(); 
            const filteredRequests = data.filter(request => {
                const requestDate = new Date(request.RequestDate);
                return requestDate.getMonth() === currentMonth && requestDate.getFullYear() === currentYear;
            });
            
            const sortedRequests = filteredRequests.sort((a, b) => new Date(b.RequestDate) - new Date(a.RequestDate));
            setMonthlyRequests(sortedRequests);
        } catch (error) {
            console.error('Error fetching monthly requests:', error);
        }
    };

    return (
        <div>
            <h2 className="text-4xl font-semibold text-center mb-6">Monthly Requests</h2>
            <div className="overflow-x-auto mx-56">
                <table className="table table-lg">
                    <thead>
                        <tr className="text-xl">
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Request Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyRequests.map((request, index) => (
                            <tr key={index}>
                                <td>{request.ProductName}</td>
                                <td>{request.ProductType}</td>
                                <td>{new Date(request.RequestDate).toLocaleDateString()}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MonthlyReq;
