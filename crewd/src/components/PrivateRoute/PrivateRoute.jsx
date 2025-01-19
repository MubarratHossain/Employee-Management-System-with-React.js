import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/Authprovider";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const { user, setUser, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isTokenValid, setIsTokenValid] = useState(null); 

  
  useEffect(() => {
    if (user) {
     
      axios
        .get("/validate-token", { withCredentials: true }) 
        .then((response) => {
          if (response.data.isValid) {
            setIsTokenValid(true); 
          } else {
            setIsTokenValid(false); 
            setUser(null); 
          }
        })
        .catch((error) => {
          setIsTokenValid(false); 
          setUser(null); 
          console.error("Token validation failed:", error);
        });
    }
  }, [user, setUser]);

  if (loading || isTokenValid === null) {
   
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isTokenValid) {
    return children; 
  }

 
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
