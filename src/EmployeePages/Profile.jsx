import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../Providers/AuthProviders";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [newUser, setNewUser] = useState(user?.displayName || "");

    const handleSaveChanges = async () => {
        try {
            await updateProfile(user, { displayName: newUser });
            console.log("Profile updated successfully!");
        } catch (error) {
            console.log(error.message);
            console.log("Failed to update profile. Please try again later.");
        }
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
                <div className="text-xl font-medium text-center my-6">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                        className="ml-6 border-2 border-solid border-black rounded-lg px-6 py-1"
                    />
                </div>
                <div className="flex justify-center">
                    <button className="btn bg-lime-200 md:w-96 text-2xl font-semibold md:px-4 " onClick={handleSaveChanges}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
