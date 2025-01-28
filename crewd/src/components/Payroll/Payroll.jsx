import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Payroll = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [userSalaries, setUserSalaries] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [recordsPerPage, setRecordsPerPage] = useState(5); // Set the number of records per page
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchPayrollRecords = useCallback(async () => {
    try {
      const response = await axios.get("https://employee-server-smoky.vercel.app/payroll", { withCredentials: true });
      setPayrollRecords(response.data);
      setTotalRecords(response.data.length); // Set the total records to adjust pagination
    } catch (error) {
      console.error("Error fetching payroll records:", error);
    }
  }, []);

  const fetchUserSalaries = useCallback(async () => {
    try {
      const response = await axios.get("https://employee-server-smoky.vercel.app/users", { withCredentials: true });
      const salaryMap = {};
      response.data.forEach(user => {
        salaryMap[user.email] = user.salary;
      });
      setUserSalaries(salaryMap);
    } catch (error) {
      console.error("Error fetching user salaries:", error);
    }
  }, []);

  useEffect(() => {
    fetchPayrollRecords();
    fetchUserSalaries();
  }, [fetchPayrollRecords, fetchUserSalaries]);

  const handleIncreaseSalary = async (email) => {
    const confirmResult = await Swal.fire({
      title: "Increase Salary?",
      text: "Are you sure you want to increase this employee's salary?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Increase!",
      cancelButtonText: "No, Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await axios.patch(
        `https://employee-server-smoky.vercel.app/payroll/increase-salary/${email}`,
        {},
        { withCredentials: true }
      );

      const newSalary = response.data.newSalary;

      setPayrollRecords(prevRecords =>
        prevRecords.map(record =>
          record.email === email ? { ...record, salary: newSalary } : record
        )
      );

      setUserSalaries(prevSalaries => ({
        ...prevSalaries,
        [email]: newSalary,
      }));

      Swal.fire({
        title: "Success!",
        text: "Salary increased successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error increasing salary:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to increase salary.",
        icon: "error",
      });
    }
  };

  const handlePay = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Confirm Payment?",
      text: "Do you want to proceed with the payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay!",
      cancelButtonText: "No, Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const paymentDate = new Date().toISOString();
      await axios.patch(
        `https://employee-server-smoky.vercel.app/payroll/${id}`,
        { paymentDate },
        { withCredentials: true }
      );

      setPayrollRecords(prevRecords =>
        prevRecords.map(record =>
          record._id === id ? { ...record, paymentDate } : record
        )
      );

      Swal.fire({
        title: "Paid!",
        text: "Payment has been processed successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to process payment.",
        icon: "error",
      });
    }
  };

  // Sort records: move pending payment dates to top
  const sortedRecords = [...payrollRecords].sort((a, b) => {
    if (!a.paymentDate && b.paymentDate) return -1;
    if (a.paymentDate && !b.paymentDate) return 1;
    return new Date(b.paymentDate) - new Date(a.paymentDate); // recent first
  });

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Payroll
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
          <thead className="bg-gradient-to-r from-gray-200 to-gray-300">
            <tr className="text-xs md:text-sm">
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Employee Name</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">User Salary</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Month & Year</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Payment Date</th>
              <th className="px-3 md:px-6 py-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 text-xs md:text-sm">
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">{record.name}</td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">
                  ${userSalaries[record.email] || "Loading..."}
                </td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">{record.month} {record.year}</td>
                <td className="px-3 md:px-6 py-2 md:py-4 text-gray-900">
                  {record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : "Pending"}
                </td>
                <td className="px-3 md:px-6 py-2 md:py-4 flex gap-2">
                  <button
                    disabled={!!record.paymentDate}
                    onClick={() => handlePay(record._id)}
                    className={`px-3 md:px-4 py-1 md:py-2 rounded-md text-white text-xs md:text-sm ${
                      record.paymentDate
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600"
                    }`}
                  >
                    {record.paymentDate ? "Paid" : "Pay"}
                  </button>

                  <button
                    onClick={() => handleIncreaseSalary(record.email)}
                    className="px-3 md:px-4 py-1 md:py-2 rounded-md text-white text-xs md:text-sm bg-green-500 hover:bg-green-600"
                  >
                    Increase Salary
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} rounded-md hover:bg-blue-600`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Payroll;
