import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/Authprovider';  // Ensure the path is correct
import axios from 'axios';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);  // Get user from AuthContext
    const [userPayments, setUserPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentsPerPage] = useState(5); // Display 5 payments per page

    // Fetch payroll data from API
    useEffect(() => {
        const fetchPayrollData = async () => {
            try {
                const response = await axios.get('https://employee-server-smoky.vercel.app/payroll', {
                    withCredentials: true,
                });
                // Filter the payroll data based on the logged-in user's email (case insensitive)
                const filteredPayments = response.data.filter(
                    (payment) =>
                        payment.email.toLowerCase() === user?.email.toLowerCase() ||
                        payment.name.toLowerCase() === user?.username.toLowerCase()
                );

                // Sort the payments by paymentDate (earliest first)
                const sortedPayments = filteredPayments.sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate));
                setUserPayments(sortedPayments);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching payroll data:", error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchPayrollData(); // Initial fetch on component mount

            // Set interval to fetch data every 5 seconds
            const intervalId = setInterval(fetchPayrollData, 5000);

            // Cleanup the interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [user]);

    // Get current payments based on pagination
    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = userPayments.slice(indexOfFirstPayment, indexOfLastPayment);

    // Handle pagination
    const totalPages = Math.ceil(userPayments.length / paymentsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{user?.username}'s Payment History</h1>
                <p className="text-base sm:text-xl text-gray-600">{user?.email}</p>
            </div>

            {loading ? (
                <div className="text-center text-xl text-gray-500">Loading payment history...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                            <tr>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-sm sm:text-base">Month</th>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-sm sm:text-base">Year</th>
                                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-sm sm:text-base">Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPayments.length > 0 ? (
                                currentPayments.map((payment) => (
                                    <tr key={payment._id} className="border-t hover:bg-gray-100">
                                        <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800">{payment.month}</td>
                                        <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800">{payment.year}</td>
                                        <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800">${payment.salary}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No payment history found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-4 text-sm sm:text-base">
                        <button 
                            onClick={prevPage} 
                            className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="text-xl text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            onClick={nextPage} 
                            className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
