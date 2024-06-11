import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../Axios/useAxiosPublic";
import Swal from "sweetalert2";
import Navbar from "../Home/Navbar";

const PackageSection = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [packageLimit, setPackageLimit] = useState(0);
    const [unaffiliatedMembers, setUnaffiliatedMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchPackageInfo = async () => {
            try {
                const response = await axiosPublic.get("/package-info");
                setEmployeeCount(response.data.employeeCount);
                setPackageLimit(response.data.packageLimit);
            } catch (error) {
                console.error("Error fetching package info", error);
            }
        };

        const fetchUnaffiliatedMembers = async () => {
            try {
                const response = await axiosPublic.get("/unaffiliated-members");
                setUnaffiliatedMembers(response.data);
            } catch (error) {
                console.error("Error fetching unaffiliated members", error);
            }
        };

        const fetchTeamMembers = async () => {
            try {
                const response = await axiosPublic.get("/team-members");
                setTeamMembers(response.data);
            } catch (error) {
                console.error("Error fetching team members", error);
            }
        };

        fetchPackageInfo();
        fetchUnaffiliatedMembers();
        fetchTeamMembers();
    }, [axiosPublic]);

    const handleSelectMember = (memberId) => {
        setSelectedMembers(prevSelectedMembers => 
            prevSelectedMembers.includes(memberId) 
                ? prevSelectedMembers.filter(id => id !== memberId) 
                : [...prevSelectedMembers, memberId]
        );
    };

    const handleAddMember = async (memberId) => {
        try {
            const response = await axiosPublic.post("/add-to-team", { memberId });
            if (response.data.success) {
                setEmployeeCount(employeeCount + 1);
                setUnaffiliatedMembers(unaffiliatedMembers.filter(member => member._id !== memberId));
                Swal.fire("Success", "Member added to the team", "success");
            }
        } catch (error) {
            console.error("Error adding member to team", error);
            Swal.fire("Error", "Could not add member to the team", "error");
        }
    };

    const handleAddSelectedMembers = async () => {
        try {
            const response = await axiosPublic.post("/add-selected-members-to-team", { memberIds: selectedMembers });
            if (response.data.success) {
                setEmployeeCount(employeeCount + selectedMembers.length);
                setUnaffiliatedMembers(unaffiliatedMembers.filter(member => !selectedMembers.includes(member._id)));
                setSelectedMembers([]);
                Swal.fire("Success", "Selected members added to the team", "success");
            }
        } catch (error) {
            console.error("Error adding selected members to team", error);
            Swal.fire("Error", "Could not add selected members to the team", "error");
        }
    };

    const handleRemoveMember = async (memberId) => {
        try {
            const response = await axiosPublic.post("/remove-from-team", { memberId });
            if (response.data.success) {
                setEmployeeCount(employeeCount - 1);
                setTeamMembers(teamMembers.filter(member => member._id !== memberId));
                Swal.fire("Success", "Member removed from the team", "success");
            }
        } catch (error) {
            console.error("Error removing member from team", error);
            Swal.fire("Error", "Could not remove member from the team", "error");
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <h2>Package Section</h2>
            <p>Current Employee Count: {employeeCount}</p>
            <p>Package Limit: {packageLimit}</p>
            <Link to="/buy-package">
                <button>Increase Limit</button>
            </Link>
            <div>
                <h3>Unaffiliated Members</h3>
                {unaffiliatedMembers.map(member => (
                    <div key={member._id}>
                        <input 
                            type="checkbox" 
                            checked={selectedMembers.includes(member._id)} 
                            onChange={() => handleSelectMember(member._id)} 
                        />
                        <img src={member.image} alt={member.name} />
                        <p>{member.name}</p>
                        <button onClick={() => handleAddMember(member._id)}>Add to the team</button>
                    </div>
                ))}
                <button onClick={handleAddSelectedMembers}>Add Selected Members to the Team</button>
            </div>
            <div>
                <h3>Team Members</h3>
                {teamMembers.map(member => (
                    <div key={member._id}>
                        <img src={member.image} alt={member.name} />
                        <p>{member.name}</p>
                        <button onClick={() => handleRemoveMember(member._id)}>Remove From Team</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackageSection;
