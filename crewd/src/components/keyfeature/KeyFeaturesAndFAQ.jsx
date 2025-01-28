import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How does Crewd track work hours?",
    answer:
      "Crewd uses intuitive digital tracking for work hours and absences, with insights for better resource allocation.",
  },
  {
    question: "Can I integrate Crewd with external systems?",
    answer:
      "Yes! Crewd offers API integrations and connections with external time-tracking devices for a flexible workflow.",
  },
  {
    question: "Does Crewd support custom categories?",
    answer:
      "Absolutely! You can create custom categories for timecards, target times, and holiday models.",
  },
  {
    question: "Is there a monthly overview feature?",
    answer:
      "Yes, Crewd provides insightful reports with a monthly view showcasing confirmed vacation days and pending approvals.",
  },
];

const KeyFeaturesAndFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-gray-100 py-16">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-fixed opacity-10"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,office')" }}
      ></div>

      <div className="relative max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
        {/* Left Side - Key Features */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800">Key Features</h2>
          <div className="space-y-6">
            {[
              "Intuitive digital tracking for work hours & absences.",
              "Monthly reports with vacation approvals.",
              "Detailed time overview with Clock-In/Out.",
              "API integrations for seamless workflow.",
              "Custom categories for timecards & holidays.",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg flex items-start space-x-4 transition-all duration-300 hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700">{feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - FAQ */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-gray-800">{faq.question}</h4>
                  {openIndex === index ? <FaMinus className="text-green-500" /> : <FaPlus className="text-gray-500" />}
                </div>
                {openIndex === index && (
                  <motion.p 
                    className="text-gray-600 mt-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeaturesAndFAQ;
