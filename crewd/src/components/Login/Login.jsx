import React, { useState, useContext } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import Image from './green-office-space.avif';
import { AuthContext } from "../../providers/Authprovider";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const { loginWithEmail } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill in all fields.");
    } else if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
    } else {
      try {
        
        const response = await loginWithEmail(email, password);
        setMessage(`Welcome back, ${response.user?.email}!`);
        
       
        Swal.fire({
          title: "Login Successful",
          text: `Welcome back, ${response.user?.email}!`,
          icon: "success",
          confirmButtonText: "OK",
        });

        
        navigate("/"); 
      } catch (error) {
        setMessage("Invalid credentials. Please try again.");
        
      
        Swal.fire({
          title: "Login Failed",
          text: "Invalid credentials. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <section
      className="h-full dark:bg-neutral-700 m-3 bg-cover bg-center"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="container h-full px-10 py-10">
        <div className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full max-w-md">
            <div className="block rounded-lg bg-slate-100 shadow-lg dark:bg-neutral-800 transform transition duration-500 ease-in-out">
              <div className="p-6 text-xs md:text-xl lg:text-xl">
                
                <div className="text-center mb-8">
                  <FaPeopleGroup className="mx-auto w-12 h-12 text-green-400 mb-2" />
                  <h4 className="mb-2 text-xl font-semibold">We are The Crewd Team</h4>
                  <p className="text-gray-600 dark:text-gray-400">Please login to your account</p>
                </div>

               
                <form onSubmit={handleLogin}>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      aria-label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                      aria-label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  
                  <div className="text-center mb-6">
                    <button
                      type="submit"
                      className="w-full px-6 py-2 rounded-md bg-gradient-to-r from-green-400 via-green-300 to-white"
                    >
                      Log In
                    </button>
                  </div>

                  {message && (
                    <div className="text-center mb-4 text-sm font-medium text-green-600">
                      {message}
                    </div>
                  )}

                  
                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-600">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  
                  <div className="mb-4">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center px-6 py-2 border rounded-md bg-gradient-to-r from-red-400 via-red-300 to-white transition-colors duration-300"
                    >
                      <FaGoogle className="mr-2" />
                      Log in with Google
                    </button>
                  </div>

                  
                  <div className="text-center">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <a href="/register" className="text-blue-600 hover:underline">
                        Register here
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
