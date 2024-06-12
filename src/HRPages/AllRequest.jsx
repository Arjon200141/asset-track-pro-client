import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

const AllRequest = () => {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Current page index
    const itemsPerPage = 7; // Number of requests per page

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('https://assettrack-pro-server.vercel.app/allrequests');
            if (response.ok) {
                const data = await response.json();
                setRequests(data);
            } else {
                console.error('Failed to fetch requests');
            }
        } catch (error) {
            console.error('Error fetching requests', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`https://assettrack-pro-server.vercel.app/allrequests/approve/${id}`, {
                method: 'PUT'
            });
            if (response.ok) {
                fetchRequests();
                Swal.fire({
                    title: 'Approval!',
                    text: `Request with ID ${id} has been approved.`,
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
            } else {
                console.error('Failed to approve request');
            }
        } catch (error) {
            console.error('Error approving request', error);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(`https://assettrack-pro-server.vercel.app/allrequests/reject/${id}`, {
                method: 'PUT'
            });
            if (response.ok) {
                fetchRequests();
                Swal.fire({
                    title: 'Rejection!',
                    text: `Request with ID ${id} has been rejected.`,
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            } else {
                console.error('Failed to reject request');
            }
        } catch (error) {
            console.error('Error rejecting request', error);
        }
    };

    const offset = currentPage * itemsPerPage;
    const currentRequests = requests.slice(offset, offset + itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div>
            <Helmet>
                <title>All Request</title>
            </Helmet>
            <div className="p-2 bg-lime-50 ">
                <h2 className="text-4xl font-semibold text-center my-6">All Requests</h2>
                <div className="overflow-x-auto ">
                    <table className="table table-sm">
                        <thead>
                            <tr className="text-md">
                                <th>Asset Name</th>
                                <th>Asset Type</th>
                                <th>Email of requester</th>
                                <th>Name of requester</th>
                                <th>Request Date</th>
                                <th>Additional note</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRequests.map((request, index) => (
                                <tr key={index}>
                                    <td>{request.ProductName}</td>
                                    <td>{request.ProductType}</td>
                                    <td>{request.UserEmail}</td>
                                    <td>{request.UserName}</td>
                                    <td>{request.RequestDate}</td>
                                    <td>{request.Notes}</td>
                                    <td>{request.RequestStatus}</td>
                                    <td className='flex gap-1'>
                                        <button
                                            className="btn bg-green-200 mr-2"
                                            onClick={() => handleApprove(request._id)}
                                            disabled={request.RequestStatus !== 'Pending'}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn bg-red-200"
                                            onClick={() => handleReject(request._id)}
                                            disabled={request.RequestStatus !== 'Pending'}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(requests.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        className="bg-green-200 py-4 px-2 md:px-8 rounded-xl flex gap-4\ md:gap-12 my-4 font-semibold"
                    />
                </div>
            </div>
        </div>
    );
};

export default AllRequest;
