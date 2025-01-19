import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", { withCredentials: true });
        const employees = response.data.filter(user => user.accountType === "Employee");
        setEmployeeList(employees);
      } catch (error) {
        console.error("Error fetching employee list:", error);
      }
    };

    fetchEmployeeList();
  }, []);

  const toggleVerification = async (email) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${email}`, { isVerified: true }, { withCredentials: true });
      const updatedEmployee = response.data;
      setEmployeeList((prevList) =>
        prevList.map((employee) =>
          employee.email === email ? { ...employee, isVerified: true } : employee
        )
      );
    } catch (error) {
      console.error("Error verifying employee:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Employee List</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Verified</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Bank Account</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Salary</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Pay</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Details</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{employee.username}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{employee.email}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {employee.isVerified ? "✅" : "❌"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{employee.bankAccountNumber}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{employee.salary}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <button
                  disabled={!employee.isVerified}
                  className={`px-4 py-2 rounded-md text-white ${
                    employee.isVerified ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Pay
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <button
                  onClick={() => toggleVerification(employee.email)}
                  className={`px-4 py-2 rounded-md text-white ${
                    employee.isVerified ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {employee.isVerified ? "Verified" : "Verify"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
