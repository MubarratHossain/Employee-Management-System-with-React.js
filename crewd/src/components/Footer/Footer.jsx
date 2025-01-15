import { FaPeopleGroup, FaReddit, FaFacebook, FaGithub } from "react-icons/fa6"; 

const Footer = () => {
    return (
        <footer className="bg-[#002B5B] rounded-lg text-white shadow-md">
            <div className="container px-6 py-4 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                    <a href="#" className="flex items-center space-x-2 mb-4 sm:mb-0">
                        <FaPeopleGroup className="w-6 h-6 text-green-400" />
                        <span className="text-xl font-bold bg-gradient-to-r from-green-400 via-green-300 to-white text-transparent bg-clip-text">
                            Crewd
                        </span>
                    </a>

                    <div className="flex flex-wrap justify-center sm:justify-start space-x-6">
                        <a href="#" className="text-sm text-gray-400 transition-colors duration-300 hover:text-green-400" aria-label="Home"> Home </a>
                        <a href="#" className="text-sm text-gray-400 transition-colors duration-300 hover:text-green-400" aria-label="About"> About </a>
                        <a href="#" className="text-sm text-gray-400 transition-colors duration-300 hover:text-green-400" aria-label="Teams"> Teams </a>
                        <a href="#" className="text-sm text-gray-400 transition-colors duration-300 hover:text-green-400" aria-label="Privacy"> Privacy </a>
                    </div>
                </div>

                <hr className="my-6 border-gray-700 md:my-10" />

                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-sm text-gray-400 mb-4 sm:mb-0">© Copyright 2021. All Rights Reserved.</p>

                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-blue-500" aria-label="Reddit">
                            <FaReddit className="w-5 h-5 fill-current" />
                        </a>

                        <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-blue-500" aria-label="Facebook">
                            <FaFacebook className="w-5 h-5 fill-current" />
                        </a>

                        <a href="#" className="text-gray-400 transition-colors duration-300 hover:text-blue-500" aria-label="Github">
                            <FaGithub className="w-5 h-5 fill-current" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
