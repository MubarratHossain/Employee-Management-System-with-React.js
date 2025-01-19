import { useState, useEffect, useContext } from "react";
import { FaHome, FaEnvelope, FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaTachometerAlt, FaServicestack } from "react-icons/fa";
import { AuthContext } from "../../providers/Authprovider";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);

    const handleLogout = () => {
        logout();
        alert("You have logged out successfully!");
    };

    const toggleUserDetails = () => {
        setShowUserDetails(!showUserDetails);
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
    
    useEffect(() => {
        console.log("User Object:", user);
    }, [user])

    // Determine which links to show based on user accountType (HR or Employee)
    const renderLinksBasedOnRole = () => {
        if (user?.accountType === "HR") {
            return (
                <>
                    <a href="/hr-dashboard" className="flex items-center text-white hover:text-green-400">
                        <FaTachometerAlt className="mr-2" /> HR Dashboard
                    </a>
                    <a href="/employee-list" className="flex items-center text-white hover:text-green-400">
                        <FaPeopleGroup className="mr-2" /> Employee List
                    </a>
                </>
            );
        } else if (user?.accountType === "Employee") {
            return (
                <>
                    <a href="/employee-dashboard" className="flex items-center text-white hover:text-green-400">
                        <FaTachometerAlt className="mr-2" /> Employee Dashboard
                    </a>
                    <a href="/services" className="flex items-center text-white hover:text-green-400">
                        <FaServicestack className="mr-2" /> Services
                    </a>
                </>
            );
        }
        return null; // If no user role is found
    };

    return (
        <div
            className={`sticky top-0 z-50 bg-[#002B5B] shadow transition-opacity duration-300 ${isScrolled ? "opacity-90" : "opacity-100"}`}
        >
            <nav className="bg-[#002B5B]">
                <div className="container px-6 py-4 mx-auto">
                    <div className="lg:flex lg:items-center lg:justify-between lg:max-w-[90%] mx-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-row ml-12 lg:ml-1">
                                <a href="#" className="flex items-center space-x-2">
                                    <FaPeopleGroup className="w-4 h-4 md:w-6 md:h-6 text-green-400" />
                                    <span className="text-xs md:text-xl font-bold bg-gradient-to-r from-green-400 via-green-300 to-white text-transparent bg-clip-text">
                                        Crewd
                                    </span>
                                </a>
                            </div>

                            <div className="flex lg:hidden absolute">
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

                        <div className="flex items-center space-x-4 ml-auto">
                            {user ? (
                                <div className="absolute top-2 md:top-2.5 right-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-full h-full object-cover rounded-full cursor-pointer"
                                                onClick={toggleUserDetails}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                                                <span className="text-gray-600 font-semibold">U</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-4 absolute top-3 right-3">
                                    <Link to="/login"> <button className="text-xs p-1 text-white ">Login</button></Link>
                                    <Link to="/register"> <button className="text-xs p-1 text-white">Register</button></Link>
                                </div>
                            )}
                        </div>

                        <div
                            className={`absolute inset-x-0 z-40 w-[50%] h-auto  p-6 mt-5 rounded-lg transition-all duration-300 ease-in-out bg-[#002B5B] lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"}`}
                        >
                            <div className="flex flex-col lg:flex-row lg:mr-12 gap-6 items-start justify-start mt-4 lg:mt-0 space-y-4 lg:space-y-0 lg:ml-6">
                                <a href="/home" className="flex items-center text-white hover:text-green-400">
                                    <FaHome className="mr-2" /> Home
                                </a>
                                {renderLinksBasedOnRole()} {/* Render role-based links */}
                                <a href="/contact" className="flex items-center text-white hover:text-green-400">
                                    <FaEnvelope className="mr-2" /> Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* User Details Pop-up */}
            {showUserDetails && user && (
                <div className="absolute bg-blue-100 top-15 right-0 rounded-lg w-32 p-2">
                    <div className="flex flex-col items-start space-y-2">
                        {/* Displaying User Info */}
                        <div className="flex flex-col space-y-1">
                            <p className="font-semibold text-xs text-gray-800">Username: {user.username || "N/A"}</p>
                            <p className="text-xs font-semibold text-gray-600">Position: {user.accountType || "N/A"}</p>
                            <p className="text-sm text-gray-600">Salary: {user.salary || "N/A"}</p>
                            
                        </div>

                        {/* Display Logout Button */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full bg-red-600 text-white text-xs p-1 rounded-full"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
