import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch additional user info from backend
  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${email}`, { withCredentials: true });
      const data = response.data;
  
      if (data) {
        setUser(prevUser => ({
          ...prevUser,
          username: data.username,
          bankAccountNumber: data.bankAccountNumber,
          accountType: data.accountType,
          uploadedPhoto: data.uploadedPhoto,
          salary: data.salary,
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  

  const registerWithEmail = async (email, password, uploadedPhoto, username, bankAccountNumber, accountType, salary) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (uploadedPhoto) {
        await updateProfile(user, { photoURL: uploadedPhoto });
      }

      setUser({ ...user, photoURL: uploadedPhoto || user.photoURL });

      const registrationData = {
        email,
        password,
        username,
        bankAccountNumber,
        accountType,
        uploadedPhoto,
        salary,
      };

      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Account Created",
          text: `Account created successfully for ${accountType}.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "There was an issue creating your account.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }

      await fetchUserData(user.email); // Fetch additional user data after registration

      return user;
    } catch (error) {
      console.error("Error creating account:", error);
      Swal.fire({
        title: "Error",
        text: "There was an issue creating your account. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);

      const res = await axios.post("http://localhost:5000/jwt", { email: result.user.email }, { withCredentials: true });

      console.log("Login Token:", res.data.token);

      await fetchUserData(result.user.email); // Fetch additional user data after login
      return result.user;
    } catch (err) {
      console.error("Login Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);

      const res = await axios.post("http://localhost:5000/jwt", { email: result.user.email }, { withCredentials: true });

      console.log("Google Login Token:", res.data.token);

      await fetchUserData(result.user.email); // Fetch additional user data after Google login
    } catch (error) {
      console.error("Google Login Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);

      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });

      console.log("User logged out, token cleared.");
    } catch (error) {
      console.error("Logout Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserData(currentUser.email); // Fetch user data when auth state changes
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
