import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Progress = () => {
  const [workEntries, setWorkEntries] = useState([]);
  const [filteredWorkEntries, setFilteredWorkEntries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  
  useEffect(() => {
    // Fetch work entries and employees on component mount
    fetchWorkEntries();
  }, []);
  
  useEffect(() => {
    // Filter work entries whenever the employee or month filter changes
    filterWorkEntries();
  }, [selectedEmployee, selectedMonth, workEntries]);
  
  // Fetch work entries
  const fetchWorkEntries = async () => {
    try {
      const response = await axios.get('https://employee-server-smoky.vercel.app/work');
      setWorkEntries(response.data);
      // Fetch employees after work entries are fetched
      fetchEmployees(response.data);
    } catch (error) {
      console.error('Error fetching work entries:', error);
    }
  };
  
  // Fetch employees (we can assume that employee data comes from the work entries)
  const fetchEmployees = (workEntries) => {
    const uniqueEmployees = [
      ...new Set(workEntries.map((entry) => entry.username))
    ]; // Getting unique employee names
    setEmployees(uniqueEmployees);
  };
  
  // Filter work entries based on selected employee and month
  const filterWorkEntries = () => {
    let filtered = [...workEntries];

    // Filter by employee
    if (selectedEmployee) {
      filtered = filtered.filter(entry => entry.username === selectedEmployee);
    }
    
    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter(entry => {
        const entryMonth = new Date(entry.date).getMonth() + 1; // months are 0-based in JavaScript
        return entryMonth === parseInt(selectedMonth);
      });
    }
    
    setFilteredWorkEntries(filtered);
  };

  return (
    <div className="m-4 rounded-lg flex items-center justify-center">
      <div className="bg-[#002B5B] p-2 max-w-[90%] mx-auto rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-6 text-white">Employee Progress</h1>

        {/* Dropdowns for filtering */}
        <div className="flex items-center justify-center mb-6 space-x-4">
          <select
            className="p-2 max-w-[50%] rounded-md text-xs"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee} value={employee}>
                {employee}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded-md text-xs"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString('en', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        {/* Work Entries Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-white mb-6 text-xs">
            <thead>
              <tr>
                <th className="border text-xs">Username</th>
                <th className="border text-xs">Task</th>
                <th className="border text-xs">Hours Worked</th>
                <th className="border text-xs">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkEntries.length > 0 ? (
                filteredWorkEntries.map((entry) => (
                  <tr key={entry._id}>
                    <td className="border px-2 py-1">{entry.username}</td>
                    <td className="border px-2 py-1">{entry.task}</td>
                    <td className="border px-2 py-1">{entry.hoursWorked}</td>
                    <td className="border px-2 py-1">{new Date(entry.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-2">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Progress;
