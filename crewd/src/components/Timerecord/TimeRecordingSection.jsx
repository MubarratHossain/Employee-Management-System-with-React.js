import React from 'react';
import { FaClock, FaUserCheck, FaBell, FaFileAlt } from 'react-icons/fa';

const TimeRecordingSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 via-green-100 to-white">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">
          Easily Manage Your Time Recording Processes
        </h2>

        <div className="flex flex-wrap justify-center gap-12">
          {/* Time-Off Request */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-green-500 bg-white shadow-lg animate-pulse hover:scale-110 transition-all">
              <FaClock className="text-3xl text-green-500" />
            </div>
            <p className="font-semibold">Time-Off Request</p>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              Employee submits time-off details via ChronoHub for manager's review.
            </p>
          </div>

          {/* Approval Process */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-green-500 bg-white shadow-lg animate-pulse hover:scale-110 transition-all">
              <FaUserCheck className="text-3xl text-green-500" />
            </div>
            <p className="font-semibold">Approval Process</p>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              Manager evaluates time-off requests against team workload & project deadlines.
            </p>
          </div>

          {/* Notification to Employee */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-green-500 bg-white shadow-lg animate-pulse hover:scale-110 transition-all">
              <FaBell className="text-3xl text-green-500" />
            </div>
            <p className="font-semibold">Notification to Employee</p>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              Employee gets notified via ChronoHub about the decision and updated leave balance if approved.
            </p>
          </div>

          {/* Record Keeping */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-green-500 bg-white shadow-lg animate-pulse hover:scale-110 transition-all">
              <FaFileAlt className="text-3xl text-green-500" />
            </div>
            <p className="font-semibold">Record Keeping</p>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              HR logs approved time-offs in the system for monitoring attendance and absences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeRecordingSection;
