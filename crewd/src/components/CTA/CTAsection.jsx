import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 via-blue-100 to-white py-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6">

        {/* Left Side - Text Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Looking for an easier way to manage your time recordings?
          </h2>
          <p className="text-gray-600 text-lg">
            Streamline your employee management process now!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact" >
              <a className="inline-block bg-green-100 text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-900 transition duration-300">
                Contact Us
              </a>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side - Parallax Image */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.img
            src="https://i.ibb.co/YBpBYZw/How-A-Digital-HRMS-Can-Help-With-Employee-Management-Issues.jpg"
            alt="Time Management"
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
            animate={{ y: [0, -10, 0] }} // Parallax Effect
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
