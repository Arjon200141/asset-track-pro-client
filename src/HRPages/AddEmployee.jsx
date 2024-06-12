import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


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
                setPackageLimit(response.data.members); 
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
                const response = await axiosPublic.get("/usersemp?role=employee");
                setTeamMembers(response.data);
                setEmployeeCount(response.data.length);
            } catch (error) {
                console.error("Error fetching team members", error);
            }
        };
        
    
        fetchPackageInfo();
        fetchUnaffiliatedMembers();
        fetchTeamMembers();
    }, [axiosPublic]);

    const handleSelectMember = (memberId) => {
        setSelectedMembers((prevSelectedMembers) =>
            prevSelectedMembers.includes(memberId)
                ? prevSelectedMembers.filter((id) => id !== memberId)
                : [...prevSelectedMembers, memberId]
        );
    };

    const handleAddMember = async (memberId) => {
        try {
            const response = await axiosPublic.post("/add-to-team", { memberId });
            if (response.data.success) {
                setEmployeeCount(employeeCount + 1);
                setUnaffiliatedMembers(unaffiliatedMembers.filter((member) => member._id !== memberId));
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
                setUnaffiliatedMembers(unaffiliatedMembers.filter((member) => !selectedMembers.includes(member._id)));
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
                setTeamMembers(teamMembers.filter((member) => member._id !== memberId));
                Swal.fire("Success", "Member removed from the team", "success");
            }
        } catch (error) {
            console.error("Error removing member from team", error);
            Swal.fire("Error", "Could not remove member from the team", "error");
        }
    };

    return (
        <div>
            <Helmet>
                <title>Add Employee</title>
            </Helmet>
            <div className="bg-red-50 py-12 space-y-4">
                <p className="text-3xl font-semibold text-center my-4">Current Employee in Team: {employeeCount}</p>
                <p className="text-2xl font-semibold text-center my-4">Package Limit: 5</p>
                <Link to="/buy-package" className="flex justify-center">
                    <button className="btn bg-lime-100 text-xl font-semibold">Increase Limit</button>
                </Link>
            </div>

            <div className="bg-green-50">
            <div className="md:mx-52 space-y-4 py-12 ">
                <h3 className="text-3xl font-semibold text-center">Team Members</h3>
                {teamMembers.map((member) => (
                    <div className="md:flex items-center justify-between" key={member._id}>
                        <div>
                        <p>Name: {member.name}</p>
                        <p>Email: {member.email}</p>
                        </div>
                        <button onClick={() => handleRemoveMember(member._id)}>Remove From Team</button>
                    </div>
                ))}
            </div>
            </div>

            <div className="mb-12 bg-purple-50 py-12">
                <h3 className="text-3xl font-semibold text-center my-10">Unaffiliated Members</h3>
                {unaffiliatedMembers.map((member) => (
                    <div key={member._id} className="md:flex justify-between md:mx-52 space-y-4">
                        <input
                            type="checkbox"
                            checked={selectedMembers.includes(member._id)}
                            onChange={() => handleSelectMember(member._id)}
                        />
                        <p>{member.email}</p>

                        <button onClick={() => handleAddMember(member._id)} className="btn bg-emerald-50">Add to the team</button>
                    </div>
                ))}
                <div className="md:mx-52 my-12">
                    <button className="btn w-full bg-sky-200 text-xl font-semibold" onClick={handleAddSelectedMembers}>Add Selected Members to the Team</button>
                </div>
            </div>
            

        </div>
    );
};

export default PackageSection;
