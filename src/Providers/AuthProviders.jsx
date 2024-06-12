import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('');

    const signIn = async (email, password) => {
        setLoading(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        setLoading(false);
        return result;
    };

    const createUser = async (email, password) => {
        setLoading(true);
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setLoading(false);
        return result;
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        const result = await signInWithPopup(auth, googleProvider);
        setLoading(false);
        return result;
    };

    const logOut = async () => {
        setLoading(true);
        await signOut(auth);
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                const role = currentUser.email === "hr@example.com" ? "hr" : "employee";
                setUserRole(role);
            } else {
                setUserRole(''); 
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const updateUserProfile = (name, photo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo 
            });
        } else {
            return Promise.reject(new Error("No user is currently signed in."));
        }
    };

    const authInfo = {
        user,
        signIn,
        loading,
        logOut,
        signInWithGoogle,
        setUserRole,
        userRole,
        createUser,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;
