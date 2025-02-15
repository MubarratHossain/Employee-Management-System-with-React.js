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


  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`https://employee-server-smoky.vercel.app/users/${email}`, { withCredentials: true });
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

      setUser({ ...user});

      const registrationData = {
        email,
        password,
        username,
        bankAccountNumber,
        accountType,
        uploadedPhoto,
        salary,
      };

      const response = await fetch('https://employee-server-smoky.vercel.app/users', {
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

      const res = await axios.post("https://employee-server-smoky.vercel.app/jwt", { email: result.user.email }, { withCredentials: true });

    

      await fetchUserData(result.user.email); 
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
      const { displayName, email, photoURL } = result.user;
  
      console.log("Google Login Success:", email);
  
     
      await axios.post("https://employee-server-smoky.vercel.app/jwt", { email }, { withCredentials: true });
  
      
      const userResponse = await axios.post("https://employee-server-smoky.vercel.app/users", {
        email,
        username: displayName || "New Employee",
        accountType: "Employee",
        uploadedPhoto: photoURL || "",
        bankAccountNumber: "",
        salary: 30000,
      }, { headers: { "Content-Type": "application/json" }, withCredentials: true });
  
      console.log("User registered in backend:", userResponse.data);
  
      
      if (!userResponse.data.user.bankAccountNumber) {
        const { value: formValues } = await Swal.fire({
          title: "Complete Your Profile",
          html:
            '<input id="swal-password" type="password" placeholder="Set a password" class="swal2-input">' +
            '<input id="swal-bank" type="text" placeholder="Bank Account Number" class="swal2-input">',
          focusConfirm: false,
          showCancelButton: true,
          preConfirm: () => {
            return {
              password: document.getElementById("swal-password").value,
              bankAccountNumber: document.getElementById("swal-bank").value
            };
          }
        });
  
        if (formValues) {
          console.log("User Input:", formValues);
          
          await axios.put(`https://employee-server-smoky.vercel.app/users/${email}`, {
            password: formValues.password,
            bankAccountNumber: formValues.bankAccountNumber
          });
  
          Swal.fire("Success!", "Your profile has been updated.", "success");
        }
      }
  
      
      await fetchUserData(email);
  
    } catch (error) {
      console.error("Google Login Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);

      await axios.post("https://employee-server-smoky.vercel.app/logout", {}, { withCredentials: true });

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
        fetchUserData(currentUser.email); 
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
