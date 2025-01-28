import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const User = () => {
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

      <h1 className="text-3xl font-bold mb-6">Various Routes</h1>
      <img
        src="https://i.ibb.co.com/q9q3zKJ/2240x1090-1-1560x760.jpg"
        alt="HR Dashboard"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-lg mb-6">
        Various user routes for monitoring employee activities, workflow progress, and payroll tasks.
        HR can easily navigate through reports, payments, and employee management. This dashboard
        provides a comprehensive overview of HR responsibilities and data management.
      </p>

      {/* Additional Content */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Key Features of HR Dashboard</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Employee Monitoring:</strong> HR can track employee workflows, tasks, and work hours in real-time, ensuring project deadlines are met and workloads are balanced effectively.
          </li>
          <li>
            <strong>Payroll Management:</strong> HR can manage salary distributions, view salary histories, and process payments seamlessly, making the payroll process more transparent and efficient.
          </li>
          <li>
            <strong>Contract Management:</strong> All employee contracts are stored digitally, with automatic reminders for contract renewal or amendments.
          </li>
          <li>
            <strong>Performance Tracking:</strong> Monitor employee performance metrics and analyze data to ensure high productivity and team alignment with organizational goals.
          </li>
          <li>
            <strong>Data Analytics:</strong> The dashboard aggregates key data, providing HR with insightful reports on employee productivity, payroll status, and contract timelines.
          </li>
        </ul>
      </section>

      {/* More Details Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">How HR Can Benefit</h2>
        <p className="text-lg mb-6">
          The HR Dashboard simplifies the process of managing multiple employee-related tasks by streamlining the workflow monitoring, payroll management, and contract renewals. With easy access to critical data and employee reports, HR can focus more on strategic decision-making and less on administrative tasks.
        </p>
        <p className="text-lg mb-6">
          By having all HR-related activities in one place, HR managers can ensure the seamless functioning of the organization and better track employee progress over time.
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Start Exploring HR Dashboard Today!</h2>
        <p className="text-lg mb-4">
          Sign in to begin managing employee workflows, payrolls, and contracts with ease.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Log In to HR Dashboard
        </button>
      </section>
    </div>
  );
};

export default User;
