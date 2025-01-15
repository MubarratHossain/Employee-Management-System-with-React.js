import { createContext, useEffect, useState } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup ,updateProfile
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
 


export const AuthContext = createContext(null);

const auth = getAuth(app); 
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  


 const registerWithEmail = async (email, password, uploadedPhoto) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        
        if (uploadedPhoto) {
            await updateProfile(user, {
                photoURL: uploadedPhoto, 
            });
        }

       
        setUser({ ...user, photoURL: uploadedPhoto || user.photoURL });
        return user;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
};

  

  
  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
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
    } catch (error) {
      console.error("Logout Error:", error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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