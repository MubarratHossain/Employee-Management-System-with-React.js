import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [payrollRecords, setPayrollRecords] = useState([]);
  const navigate = useNavigate();

  const fetchEmployeeList = useCallback(async () => {
    try {
      const response = await axios.get("https://employee-server-smoky.vercel.app/users", { withCredentials: true });
      const employees = response.data.filter(user => user.accountType === "Employee");
      setEmployeeList(employees);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  }, []);

  const fetchPayrollRecords = useCallback(async () => {
    try {
      const response = await axios.get("https://employee-server-smoky.vercel.app/payroll", { withCredentials: true });
      setPayrollRecords(response.data);
    } catch (error) {
      console.error("Error fetching payroll records:", error);
    }
  }, []);

  useEffect(() => {
    fetchEmployeeList();
    fetchPayrollRecords();
  }, [fetchEmployeeList, fetchPayrollRecords]);

  const toggleVerification = async (email) => {
    try {
      await axios.patch(`https://employee-server-smoky.vercel.app/users/${email}`, { isVerified: true }, { withCredentials: true });
      fetchEmployeeList();
    } catch (error) {
      console.error("Error verifying employee:", error);
    }
  };

  const handlePayClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedDate) {
      Swal.fire({
        title: "Error!",
        text: "Please select a valid date.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const month = selectedDate.toLocaleString("default", { month: "long" });
    const year = selectedDate.getFullYear();

    const alreadyPaid = payrollRecords.some(
      (record) => record.email === selectedEmployee.email && record.month === month && record.year === year.toString()
    );

    if (alreadyPaid) {
      Swal.fire({
        title: "Error!",
        text: "This employee has already been paid for this month.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await axios.post(
        "https://employee-server-smoky.vercel.app/payroll",
        {
          email: selectedEmployee.email,
          name: selectedEmployee.username,
          salary: selectedEmployee.salary,
          month,
          year,
          status: "Pending Approval",
        },
        { withCredentials: true }
      );

      Swal.fire({
        title: "Success!",
        text: "Payment request submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setShowModal(false);
      setSelectedDate(new Date());
      fetchPayrollRecords();
    } catch (error) {
      console.error("Error submitting payment request:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue submitting the payment request.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Employee List
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
          <thead className="bg-gradient-to-r from-gray-200 to-gray-300">
            <tr className="text-xs md:text-sm">
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Name</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Email</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Verified</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Bank Account</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Salary</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Pay</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Details</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 text-xs md:text-sm">
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">{employee.username}</td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">{employee.email}</td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">
                  {employee.isVerified ? "✅" : "❌"}
                </td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">{employee.bankAccountNumber}</td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">{employee.salary}</td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">
                  <button
                    disabled={!employee.isVerified}
                    onClick={() => handlePayClick(employee)}
                    className={`px-3 md:px-4 py-1 md:py-2 rounded-md text-white text-xs md:text-sm bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 ${employee.isVerified ? "" : "cursor-not-allowed opacity-50"
                      }`}
                  >
                    Pay
                  </button>
                </td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">
                  <button
                    onClick={() => toggleVerification(employee.email)}
                    className={`px-3 md:px-4 py-1 md:py-2 rounded-md text-white text-xs md:text-sm ${employee.isVerified
                        ? "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
                        : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
                      }`}
                  >
                    {employee.isVerified ? "Verified" : "Verify"}
                  </button>
                </td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">
                  <button
                    onClick={() => navigate(`/employee/${employee.email}`)} 
                    className="px-3 md:px-4 py-1 md:py-2 rounded-md text-white text-xs md:text-sm bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Pay Employee</h2>
            <p className="mb-2">Salary: <span className="font-bold">${selectedEmployee.salary}</span></p>
            <label className="block mb-2">Select Month & Year</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="border px-2 py-1 w-full rounded-md mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handlePaymentSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
