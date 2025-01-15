import { useState, useEffect, useContext } from "react";
import { FaHome, FaEnvelope, FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { AuthContext } from "../../providers/Authprovider";

const Navbar = () => {
    const { user, logout, uploadedPhoto } = useContext(AuthContext); 
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleLogout = () => {
        logout();
        alert("You have logged out successfully!");
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`sticky top-0 z-50 bg-[#002B5B] shadow transition-opacity duration-300 ${isScrolled ? "opacity-90" : "opacity-100"}`}
        >
            <nav className="bg-[#002B5B]">
                <div className="container px-6 py-4 mx-auto">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        
                        <div className="flex items-center justify-between">
                            <a href="#" className="flex items-center space-x-2">
                                <FaPeopleGroup className="w-6 h-6 text-green-400" />
                                <span className="text-xl font-bold bg-gradient-to-r from-green-400 via-green-300 to-white text-transparent bg-clip-text">
                                    Crewd
                                </span>
                            </a>

                            
                            <div className="flex lg:hidden">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type="button"
                                    className="text-gray-200 hover:text-white focus:outline-none"
                                    aria-label="toggle menu"
                                >
                                    {!isOpen ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        
                        <div
                            className={`absolute inset-x-0 z-40 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-[#002B5B] lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"}`}
                        >
                            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                                <a
                                    href="/dashboard"
                                    className="flex items-center px-3 py-2 mx-3 mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-white transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-[#004080] hover:text-white"
                                >
                                    <FaHome className="w-5 h-5 mr-2" /> Dashboard
                                </a>
                                <a
                                    href="/contact"
                                    className="flex items-center px-3 py-2 mx-3 mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-white transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-[#004080] hover:text-white"
                                >
                                    <FaEnvelope className="w-5 h-5 mr-2" /> Contact Us
                                </a>
                            </div>

                            
                            <div className="flex items-center mt-4 lg:mt-0">
                                {user ? (
                                    <div className="flex items-center space-x-4">
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow"
                                        >
                                            <FaSignOutAlt className="w-5 h-5 mr-2" /> Logout
                                        </button>
                                        
                                        <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                            
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt="Profile" className="w-8 h-8 object-cover rounded-full" />
                                            ) : (
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                    
                                                    <span className="text-gray-600 font-semibold">U</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-x-4 flex">
                                        <a
                                            href="/login"
                                            className="flex items-center p-2 rounded-full bg-gradient-to-r from-green-400 via-green-300 to-white"
                                        >
                                            <FaSignInAlt className="w-5 h-5 mr-2" /> Login
                                        </a>
                                        <a
                                            href="/register"
                                            className="flex items-center p-2 rounded-full bg-gradient-to-r from-green-400 via-green-300 to-white"
                                        >
                                            <FaUserPlus className="w-5 h-5 mr-2" /> Register
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
