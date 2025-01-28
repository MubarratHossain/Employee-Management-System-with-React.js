import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; 

const EmployeeDetails = () => {
  const { email } = useParams(); 
  const [employee, setEmployee] = useState(null);
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const userResponse = await axios.get("https://employee-server-smoky.vercel.app/users", { withCredentials: true });
        const user = userResponse.data.find(user => user.email === email);
        
      
        const payrollResponse = await axios.get("https://employee-server-smoky.vercel.app/payroll", { withCredentials: true });
        const userPayrolls = payrollResponse.data.filter(record => record.email === email);

        setEmployee(user);
        setPayrollRecords(userPayrolls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!employee) return <p className="text-center">Employee not found.</p>;

  
  const chartData = {
    labels: payrollRecords.map(record => `${record.month} ${record.year}`),
    datasets: [
      {
        label: "Salary",
        data: payrollRecords.map(record => record.salary),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-lg text-blue-500 hover:text-blue-700"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Employee Details
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <img
          src={employee.uploadedPhoto || "https://via.placeholder.com/150"}
          alt="Employee"
          className="w-32 h-32 mx-auto rounded-full border"
        />
        <h2 className="text-xl font-bold text-center mt-4">{employee.username}</h2>
        <p className="text-gray-700 text-center">{employee.email}</p>
        <div className="mt-4">
          <p><strong>Bank Account:</strong> {employee.bankAccountNumber}</p>
          <p><strong>Salary:</strong> ${employee.salary}</p>
          <p><strong>Account Type:</strong> {employee.accountType}</p>
          <p><strong>Verified:</strong> {employee.isVerified ? "✅ Yes" : "❌ No"}</p>
         
        </div>

        
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-center mb-4">Salary vs. Month/Year</h3>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
