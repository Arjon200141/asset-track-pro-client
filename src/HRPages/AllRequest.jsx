import React, { useState, useEffect } from 'react';
import Navbar from '../Home/Navbar';
import Swal from 'sweetalert2';

const AllRequest = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:4000/requests');
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
            const response = await fetch(`http://localhost:4000/requests/approve/${id}`, {
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
            const response = await fetch(`http://localhost:4000/requests/reject/${id}`, {
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

    return (
        <div>
            <Navbar />
            <div className="p-4 bg-fuchsia-50 ">
                <h2 className="text-4xl font-semibold text-center">All Requests</h2>
                <div className="overflow-x-auto mx-12">
                    <table className="table table-lg">
                        <thead>
                            <tr className="text-xl">
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
                            {requests.map((request, index) => (
                                <tr key={index}>
                                    <td>{request.assetName}</td>
                                    <td>{request.assetType}</td>
                                    <td>{request.userEmail}</td>
                                    <td>{request.userName}</td>
                                    <td>{request.requestDate}</td>
                                    <td>{request.additionalNote}</td>
                                    <td>{request.status}</td>
                                    <td>
                                        <button
                                            className="btn bg-green-200 mr-2"
                                            onClick={() => handleApprove(request.id)}
                                            disabled={request.status !== 'Pending'}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn bg-red-200"
                                            onClick={() => handleReject(request.id)}
                                            disabled={request.status !== 'Pending'}
                                        >
                                            Reject
                                        </button>
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

export default AllRequest;
