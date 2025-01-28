import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const ContractManagement = () => {
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

      <h1 className="text-3xl font-bold mb-6">Contract Management</h1>
      <img
        src="https://i.ibb.co.com/TWP91y4/what-is-contract-management-system-inset.jpg"
        alt="Contract Management"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-lg mb-6">
        Keep track of employee contracts, amendments, and renewal dates. HR can view and manage
        employee contracts digitally for smoother operations. This service allows for centralized
        contract management with easy tracking of renewal and expiration dates.
      </p>

      {/* Additional Content */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Key Features of Contract Management</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Centralized Repository:</strong> Manage all employee contracts in one place, eliminating the need for physical storage and reducing administrative overhead.
          </li>
          <li>
            <strong>Automatic Renewal Reminders:</strong> Get timely notifications about upcoming contract renewals, amendments, or expirations.
          </li>
          <li>
            <strong>Amendment Tracking:</strong> Easily track contract amendments and any changes made to the original agreements.
          </li>
          <li>
            <strong>Version Control:</strong> Keep track of contract versions, ensuring that HR always has the most up-to-date document.
          </li>
          <li>
            <strong>Legal Compliance:</strong> Ensure contracts are compliant with relevant labor laws and regulations, helping HR maintain legal integrity.
          </li>
        </ul>
      </section>

      {/* More Details Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">How Contract Management Benefits HR</h2>
        <p className="text-lg mb-6">
          By digitizing contract management, HR can streamline workflows, improve efficiency, and minimize human error. Centralized storage and automated reminders ensure that HR stays on top of contract renewals and amendments without missing important deadlines.
        </p>
        <p className="text-lg mb-6">
          Employees benefit from clear, accessible contract terms and amendments, reducing misunderstandings and disputes.
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Start Managing Employee Contracts Seamlessly</h2>
        <p className="text-lg mb-4">
          Log in to manage employee contracts, track amendments, and ensure all contracts are up-to-date and legally compliant.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Log In to Contract Management
        </button>
      </section>
    </div>
  );
};

export default ContractManagement;
