import { useState, useEffect } from 'react';
import Navbar from '../Home/Navbar';
import Swal from 'sweetalert2';

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:4000/users');
            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
            } else {
                console.error('Failed to fetch employees');
            }
        } catch (error) {
            console.error('Error fetching employees', error);
        }
    };

    const handleCheckboxChange = (userId) => {
        const isSelected = selectedEmployees.includes(userId);
        if (isSelected) {
            setSelectedEmployees(selectedEmployees.filter(id => id !== userId));
        } else {
            setSelectedEmployees([...selectedEmployees, userId]);
        }
    };

    const addSelectedEmployeesToTeam = async () => {
        try {
            // Call API to add selected employees to the team
            // Update team member count
            Swal.fire({
                title: 'Success!',
                text: 'Selected employees added to the team.',
                icon: 'success',
                confirmButtonText: 'Close'
            });
        } catch (error) {
            console.error('Error adding employees to the team', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-4 bg-fuchsia-50 pl-40">
                <h2 className="text-4xl font-semibold text-center">Employee Page</h2>

                {/* Package Section */}
                <div className="mb-6">
                    {/* Display employee counts and package limit */}
                    <p>Employee Count: {employees.length}</p>
                    <p>Package Limit: 20 members</p>
                    {/* Button to increase the limit */}
                    <button className="btn bg-blue-500 text-white">Increase Limit</button>
                </div>

                {/* Employee List Section */}
                <div className="overflow-x-auto mx-12">
                    <table className="table table-lg">
                        <thead>
                            <tr className="text-xl">
                                <th>Checkbox</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Add to Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedEmployees.includes(employee.id)}
                                            onChange={() => handleCheckboxChange(employee.id)}
                                        />
                                    </td>
                                    <td><img src={employee.imageUrl} alt={employee.name} className="w-12 h-12 rounded-full" /></td>
                                    <td>{employee.name}</td>
                                    <td>
                                        <button className="btn bg-green-200">Add to Team</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Button to add selected members to the team */}
                <div className="text-center mt-6">
                    <button className="btn bg-green-500 text-white" onClick={addSelectedEmployeesToTeam}>Add Selected Members to the Team</button>
                </div>
            </div>
        </div>
    );
};

export default EmployeePage;
