import { useState, useEffect } from 'react';
import Navbar from '../Home/Navbar';
import Swal from 'sweetalert2';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:4000/users?role=employee');
            if (response.ok) {
                const data = await response.json();
                // Filter users whose role is 'employee'
                const employees = data.filter(user => user.role === 'employee');
                setEmployees(employees);
            } else {
                console.error('Failed to fetch employees');
            }
        } catch (error) {
            console.error('Error fetching employees', error);
        }
    };

    const removeEmployee = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/users/${userId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchEmployees(); // Re-fetch the employees after deleting
                Swal.fire({
                    title: 'Success!',
                    text: 'Employee removed from the team.',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
            } else {
                console.error('Failed to remove employee');
            }
        } catch (error) {
            console.error('Error removing employee', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-4 bg-fuchsia-50 pl-40">
                <h2 className="text-4xl font-semibold text-center">Employee List</h2>
                <div className="overflow-x-auto mx-12">
                    <h2 className='text-2xl font-semibold text-center my-8'>Total Members: {employees.length}</h2>
                    <table className="table table-lg">
                        <thead>
                            <tr className="text-2xl">
                                <th>Email</th>
                                <th>Name</th>
                                <th>Remove From Team</th>
                            </tr>
                        </thead>
                        <tbody className='text-xl'>
                            {employees.map((employee, index) => (
                                <tr  key={index}>
                                    <td>{employee.email}</td>
                                    <td>{employee.user.displayName}</td>
                                    <td className='flex justify-center'>
                                        <button
                                            className="btn bg-red-200 text-xl font-semibold"
                                            onClick={() => removeEmployee(employee._id)}
                                        > Remove</button>
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

export default EmployeeList;
