import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMoneyBillWave, FaArrowUp, FaTimes, FaHistory } from "react-icons/fa";

const HrPayment = () => {
  const [hrUsers, setHrUsers] = useState([]);
  const [userSalaries, setUserSalaries] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [userPayments, setUserPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const fetchHRUsers = async () => {
      try {
        const response = await axios.get("https://employee-server-smoky.vercel.app/users", { withCredentials: true });
        const hrUsersList = response.data.filter(user => user.accountType === "HR");
        setHrUsers(hrUsersList);
        const salaryMap = {};
        hrUsersList.forEach(user => { salaryMap[user.email] = user.salary; });
        setUserSalaries(salaryMap);
      } catch (error) {
        console.error("Error fetching HR users:", error);
      }
    };

    fetchHRUsers();  
    const interval = setInterval(fetchHRUsers, 5000);  

    return () => clearInterval(interval);  
  }, []);

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = hrUsers.slice(indexOfFirstUser, indexOfLastUser);

  const openPaymentModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const openPaymentHistoryModal = (user) => {
    setSelectedUser(user);
    setUserPayments(user.payments || []);
    setShowHistoryModal(true);
  };

  const handlePay = async () => {
    if (!selectedUser) return;

    const paymentMonth = paymentDate.toLocaleString("default", { month: "long" });
    const paymentYear = paymentDate.getFullYear();

    if (selectedUser.payments?.some(p => p.paymentMonth === paymentMonth && p.paymentYear === paymentYear)) {
      Swal.fire("Error!", `Payment for ${paymentMonth} ${paymentYear} has already been processed!`, "error");
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Confirm Payment?",
      text: `Do you want to proceed with the payment of $${userSalaries[selectedUser.email]} for ${paymentMonth} ${paymentYear}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay!",
      cancelButtonText: "No, Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const paymentDateISO = paymentDate.toISOString();
      const response = await axios.patch(
        `https://employee-server-smoky.vercel.app/users/pay/${selectedUser.email}`,
        { paymentDate: paymentDateISO, paymentMonth, paymentYear },
        { withCredentials: true }
      );

      const updatedUser = response.data;
      setHrUsers(prevUsers => prevUsers.map(user =>
        user.email === selectedUser.email
          ? { ...user, payments: updatedUser.payments }
          : user
      ));

      Swal.fire("Paid!", `Payment for ${paymentMonth} ${paymentYear} has been processed successfully!`, "success");
      setShowModal(false);
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire("Error!", "Failed to process payment.", "error");
    }
  };

  const handleIncreaseSalary = async (email) => {
    try {
      const response = await axios.patch(`https://employee-server-smoky.vercel.app/users/increase-salary/${email}`, {}, { withCredentials: true });
      setUserSalaries(prevSalaries => ({ ...prevSalaries, [email]: response.data.newSalary }));
      Swal.fire("Success!", "Salary increased successfully!", "success");
    } catch (error) {
      console.error("Error increasing salary:", error);
      Swal.fire("Error!", "Failed to increase salary.", "error");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(hrUsers.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        HR Payment Management
      </h1>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full border-gray-300 rounded-md text-xs sm:text-sm md:text-base">
          <thead className="bg-gradient-to-r from-gray-200 to-gray-300">
            <tr>
              <th className="px-2 py-1 sm:px-4 sm:py-2 text-left">Employee Name</th>
              <th className="px-2 py-1 sm:px-4 sm:py-2 text-left">Salary</th>
              <th className="px-2 py-1 sm:px-4 sm:py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-2 py-1 sm:px-4 sm:py-2">{user.username}</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2">${userSalaries[user.email] || "Loading..."}</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 flex gap-2">
                  <button 
                    onClick={() => openPaymentModal(user)}
                    className="flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 rounded-md text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-xs sm:text-sm"
                  >
                    <FaMoneyBillWave /> Pay
                  </button>
                  <button 
                    onClick={() => handleIncreaseSalary(user.email)}
                    className="flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-xs sm:text-sm"
                  >
                    <FaArrowUp /> Increase Salary
                  </button>
                  <button 
                    onClick={() => openPaymentHistoryModal(user)}
                    className="flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 rounded-md text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-xs sm:text-sm"
                  >
                    <FaHistory /> View Payment History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={handlePrevious} 
          className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 text-xs sm:text-sm"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xs sm:text-sm text-gray-600">
          Page {currentPage} of {Math.ceil(hrUsers.length / rowsPerPage)}
        </span>
        <button 
          onClick={handleNext} 
          className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 text-xs sm:text-sm"
          disabled={currentPage === Math.ceil(hrUsers.length / rowsPerPage)}
        >
          Next
        </button>
      </div>

      {/* Payment and History Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Confirm Payment</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Payment Date</label>
              <DatePicker
                selected={paymentDate}
                onChange={date => setPaymentDate(date)}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handlePay}
                className="w-full py-2 bg-green-500 text-white rounded-md text-sm"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full flex items-center justify-center py-1 bg-red-500 text-white rounded-md text-sm"
              >
                <FaTimes /> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showHistoryModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xs sm:max-w-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Payment History of {selectedUser.username}</h2>
            <div className="mb-4">
              <img src={selectedUser.uploadedPhoto} alt="User Profile" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4" />
              <p className="text-xs sm:text-sm font-medium">Salary: ${selectedUser.salary}</p>
            </div>
            <div>
              <h3 className="text-md sm:text-lg font-semibold mb-2">Payments:</h3>
              <ul className="text-xs sm:text-sm">
                {userPayments.map((payment, index) => (
                  <li key={index} className="mb-2">
                    {payment.paymentMonth} {payment.paymentYear}: ${payment.salary}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setShowHistoryModal(false)}
              className="w-full py-1 flex justify-center items-center gap-1 bg-red-500 text-white rounded-md mt-4 text-xs sm:text-sm"
            >
               Close <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrPayment;
