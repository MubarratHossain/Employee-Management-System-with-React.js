import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const Payrolll = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="max-w-4xl mx-auto py-16">
      <div className="mb-6">
        {/* Back Arrow Button */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="text-lg text-green-500 hover:text-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L11 6.414V17a1 1 0 11-2 0V6.414L6.707 8.707A1 1 0 015.293 7.293l4-4A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Payroll Management</h1>
      <img
        src="https://i.ibb.co.com/myrVrQ1/Payroll-Systems.jpg"
        alt="Payroll Management"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-lg mb-6">
        Easily manage employee salaries, process payments, and track financial records. HR can issue
        payments and monitor salary distributions. This service helps in maintaining accurate payroll
        processing and ensures timely payments for employees.
      </p>

      {/* Additional Content */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Key Features of Payroll Management</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Salary Processing:</strong> HR can easily process employee salaries based on predefined rates, taking into account working hours, bonuses, and deductions.
          </li>
          <li>
            <strong>Payment Tracking:</strong> Track all payments issued to employees, including payment dates, amounts, and payment methods for full transparency.
          </li>
          <li>
            <strong>Tax Calculations:</strong> Payroll systems can automatically calculate and apply taxes to ensure compliance with tax regulations.
          </li>
          <li>
            <strong>Employee Pay History:</strong> Employees can view their pay history, including previous payments, deductions, and bonuses.
          </li>
          <li>
            <strong>Direct Deposits:</strong> HR can set up direct deposit payments, ensuring timely and secure transactions directly to employees’ bank accounts.
          </li>
        </ul>
      </section>

      {/* More Details Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">How Payroll Management Benefits HR and Employees</h2>
        <p className="text-lg mb-6">
          Payroll management ensures that employees are paid on time and that HR can easily track all payroll-related information. With automated salary calculations, tax deductions, and payment processing, HR can reduce errors and save time.
        </p>
        <p className="text-lg mb-6">
          Employees benefit by receiving accurate and timely payments. The ability to access detailed pay history and track their salary payments gives employees peace of mind and builds trust.
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Start Managing Payroll Effectively!</h2>
        <p className="text-lg mb-4">
          Log in to streamline your payroll process, track employee payments, and ensure smooth financial management for your organization.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Log In to Payroll Management
        </button>
      </section>
    </div>
  );
};

export default Payrolll;
