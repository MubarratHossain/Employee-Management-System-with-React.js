import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const WorkflowMonitoring = () => {
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

      <h1 className="text-3xl font-bold mb-6">Employee Workflow Monitoring</h1>
      <img
        src="https://i.ibb.co.com/QvVkTjq/Improve-Onboarding-Process-with-Modern-Tech.webp"
        alt="Employee Workflow Monitoring"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-lg mb-6">
        Track employee tasks, hours worked, and update workflow for efficient project management.
        Employees can log tasks, and HR can monitor real-time progress. This system helps in improving
        productivity and optimizing resource allocation within the team.
      </p>

      {/* Additional Content */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Key Features of Workflow Monitoring</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Task Logging:</strong> Employees can log their tasks along with hours worked, ensuring accurate tracking and reporting of project progress.
          </li>
          <li>
            <strong>Real-Time Monitoring:</strong> HR can view the progress of tasks in real-time, enabling them to take action promptly if any employee is falling behind or facing challenges.
          </li>
          <li>
            <strong>Task Prioritization:</strong> Tasks can be assigned priorities, ensuring that critical tasks are completed first, optimizing team efforts and resources.
          </li>
          <li>
            <strong>Performance Insights:</strong> HR can analyze data trends to evaluate employee performance and productivity, helping in resource allocation and project planning.
          </li>
          <li>
            <strong>Project Visibility:</strong> Workflow progress can be viewed by both employees and HR, ensuring transparent and smooth collaboration.
          </li>
        </ul>
      </section>

      {/* More Details Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">How HR and Employees Benefit</h2>
        <p className="text-lg mb-6">
          The employee workflow monitoring system provides a clear overview of team tasks and productivity. HR can ensure that each employee is staying on track with their assigned tasks and workloads, improving overall performance.
        </p>
        <p className="text-lg mb-6">
          Employees benefit by having a structured way to log their tasks and time, which helps in maintaining a balanced workload and ensures that their contributions are accurately tracked.
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Start Monitoring Workflows Today!</h2>
        <p className="text-lg mb-4">
          Log in to start tracking tasks, hours worked, and monitor real-time progress on your team’s workflows.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Log In to Workflow Monitoring
        </button>
      </section>
    </div>
  );
};

export default WorkflowMonitoring;
