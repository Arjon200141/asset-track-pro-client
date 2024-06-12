import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";

const HRProfile = _id => {
    const { user } = useContext(AuthContext);

    const [newUser, setNewUser] = useState(user?.displayName || "");

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        
        // Ensure the new user is formatted correctly
        const updatedUser = { displayName: name };
        
        fetch(`https://assettrack-pro-server.vercel.app/users/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Failed to update profile');
            }
        })
        .then(data => {
            console.log(data);
            Swal.fire({
                title: 'Success!',
                text: 'User Updated Successfully!!',
                icon: 'success',
                confirmButtonText: 'Close'
            });
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update profile. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        });
    };

    return (
        <div className="bg-violet-200 py-12">
            <div className="mb-12 space-y-3 border-2 border-solid border-black md:mx-40 md:p-12 py-12 rounded-xl bg-violet-50">
                <h2 className="text-4xl font-semibold text-center mb-4">Current Details</h2>
                {user && (
                    <>
                        <div className="rounded-full flex justify-center">
                            <img alt="Profile" src={user.photoURL || "https://i.ibb.co/dDx1cfY/user.png"} />
                        </div>
                        <p className="text-lg text-center"><span className="text-lg font-medium">Name : </span>{user.displayName}</p>
                        <p className="text-lg text-center"><span className="text-lg font-medium">Email : </span>{user.email}</p>
                    </>
                )}
            </div>

            <div className="border-2 border-solid border-black md:mx-40 md:p-12 py-12 rounded-xl bg-purple-50">
                <h2 className="text-4xl font-semibold text-center mb-4">Update Profile</h2>
                <form  className="text-xl font-medium text-center my-6">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                        className="ml-6 border-2 border-solid border-black rounded-lg px-6 py-1 my-4"
                    />
                    <div className="flex justify-center">
                        <button onClick={handleUpdate} type="submit" className="btn bg-lime-200 md:w-96 text-2xl font-semibold md:px-4">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HRProfile;
