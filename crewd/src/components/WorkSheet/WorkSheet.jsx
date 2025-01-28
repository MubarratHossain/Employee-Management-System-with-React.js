import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/Authprovider";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkSheet = () => {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

 
  const [task, setTask] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [date, setDate] = useState(new Date());
  const [editingEntry, setEditingEntry] = useState(null); // For tracking which entry is being edited


  const [workEntries, setWorkEntries] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);  // State to manage modal visibility

  useEffect(() => {
    if (user) {
      fetchUserData();
  
     
      const interval = setInterval(() => {
        fetchWorkEntries();
      }, 10000);
  
     
      return () => clearInterval(interval);
    }
  }, [user]);
 
  
 
  
  

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://employee-server-smoky.vercel.app/users", { withCredentials: true });
      const users = response.data;
      const foundUser = users.find((userData) => userData.email.toLowerCase() === user.email.toLowerCase());
      if (foundUser) {
        setCurrentUser(foundUser);
        fetchWorkEntries(foundUser.username); 
      } else {
        setError("User not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("An error occurred while fetching user data.");
    }
  };

  const fetchWorkEntries = async () => {
    try {
      const response = await axios.get("https://employee-server-smoky.vercel.app/work");
      const userWorkEntries = response.data.filter((entry) => entry.userEmail === user.email);
      setWorkEntries(userWorkEntries);
    } catch (error) {
      console.error("Error fetching work entries:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("User data not available.");
      return;
    }

    const newWorkEntry = {
      task,
      hoursWorked,
      date,
      userEmail: user.email,
      username: currentUser.username, // Include username
    };

    try {
      const response = await axios.post("https://employee-server-smoky.vercel.app/work", newWorkEntry, { withCredentials: true });
      setWorkEntries([response.data, ...workEntries]); // Update UI
      resetForm();
    } catch (error) {
      console.error("Error adding work entry:", error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://employee-server-smoky.vercel.app/work/${id}`, { withCredentials: true });
      setWorkEntries(workEntries.filter(entry => entry._id !== id)); // Remove from table
    } catch (error) {
      console.error("Error deleting work entry:", error);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry); // Set the entry to be edited
    setTask(entry.task);
    setHoursWorked(entry.hoursWorked);
    setDate(new Date(entry.date));
    setModalIsOpen(true);  // Open the modal
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingEntry) return;

    const updatedWorkEntry = { task, hoursWorked, date, userEmail: user.email };

    try {
      const response = await axios.put(`https://employee-server-smoky.vercel.app/work/${editingEntry._id}`, updatedWorkEntry, { withCredentials: true });
      const updatedEntries = workEntries.map((entry) =>
        entry._id === editingEntry._id ? { ...entry, ...updatedWorkEntry } : entry
      );
      setWorkEntries(updatedEntries); // Update the table with the edited work entry
      setModalIsOpen(false);  // Close the modal
      setEditingEntry(null); // Reset the editing mode
      resetForm();
    } catch (error) {
      console.error("Error updating work entry:", error);
    }
  };

  const resetForm = () => {
    setTask("");
    setHoursWorked("");
    setDate(new Date());
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingEntry(null);
  };
  if (error) {
    return <div>{error}</div>;
  }

  if (!currentUser) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="m-4 rounded-lg flex items-center justify-center">
      <div className="bg-[#002B5B] p-2 max-w-[90%] mx-auto rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-6 text-white">Employee Worksheet</h1>

        {/* Display current user info */}
        <div className="flex items-center justify-center mb-6 flex-wrap sm:flex-nowrap">
          <img src={currentUser.uploadedPhoto} alt={currentUser.username} className="w-20 h-20 rounded-full mr-4 border-2 border-green-500" />
          <div>
            <p className="text-lg font-medium text-white"><strong>Name:</strong> {currentUser.username}</p>
            <p className="text-md text-white"><strong>Email:</strong> {currentUser.email}</p>
            <p className="text-md text-white"><strong>Salary:</strong> {currentUser.salary}</p>
            <p className="text-md text-white">
              <strong>Verified:</strong>
              {currentUser.isVerified ? (
                <span className="text-green-500 flex items-center">
                  <AiOutlineCheckCircle className="mr-2" /> Yes
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <AiOutlineCloseCircle className="mr-2" /> No
                </span>
              )}
            </p>
          </div>
        </div>

        {currentUser.isVerified ? (
          <div>
            <p className="text-center text-lg text-white">Access to Worksheet granted.</p>

            {/* Form for submitting or updating work entry */}
            <form onSubmit={editingEntry ? handleUpdate : handleSubmit} className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <select
                  className="p-2 rounded-md w-full sm:w-auto text-xs"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required
                >
                  <option value="">Select Task</option>
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Content">Content</option>
                  <option value="Paper-work">Paper-work</option>
                </select>
                <input
                  type="number"
                  className="p-2 rounded-md w-full sm:w-auto text-xs"
                  placeholder="Hours Worked"
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  required
                />
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="p-2 rounded-md w-full sm:w-auto text-xs"
                  dateFormat="yyyy-MM-dd"
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full sm:w-auto text-xs">
                  {editingEntry ? "Update" : "Add / Submit"}
                </button>
              </div>
            </form>

            {/* Work Entries Table */}
     <div className="overflow-x-auto">
     <table className="table-auto w-full text-white mb-6 text-xs">
              <thead>
                <tr>
                  <th className="border  text-xs  ">Username</th> {/* Ensure username is displayed */}
                  <th className="border text-xs">Task</th>
                  <th className="border text-xs">Hours Worked</th>
                  <th className="border text-xs">Date</th>
                  <th className="border text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workEntries.map((entry) => (
                  <tr key={entry._id}>
                    <td className="border px-2 py-1">{entry.username}</td> {/* Display username dynamically */}
                    <td className="border px-2 py-1">{entry.task}</td>
                    <td className="border px-2 py-1">{entry.hoursWorked}</td>
                    <td className="border px-2 py-1">{new Date(entry.date).toLocaleDateString()}</td>
                    <td className="border px-2 py-1 space-y-3  space-x-3">
                      <button onClick={() => handleEdit(entry)} className="text-yellow-500 text-[13px]">🖊</button>
                      <button onClick={() => handleDelete(entry._id)} className="text-red-500 text-[13px]">❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

     </div>

            {/* Custom Modal for editing work entry */}
            {/* Custom Modal for editing work entry */}
            {modalIsOpen && (
              <div className="modal-overlay p-3 bg-gradient-to-br from-blue-900 to-blue-500 rounded-lg">

                <div className="modal-content">
                  <h2 className="text-lg flex justify-center font-semibold mb-4">Edit Work Entry</h2>
                  <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <input
                      type="text"
                      className="p-2 rounded-md"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      required
                      placeholder="Task"
                    />
                    <input
                      type="number"
                      className="p-2 rounded-md"
                      value={hoursWorked}
                      onChange={(e) => setHoursWorked(e.target.value)}
                      required
                      placeholder="Hours Worked"
                    />
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      className="p-2 rounded-md"
                      dateFormat="yyyy-MM-dd"
                    />
                    <button type="submit" className="bg-green-500 text-white p-2 rounded-md">Update</button>
                    <button type="button" onClick={closeModal} className="bg-red-500 text-white p-2 rounded-md">Close</button>
                  </form>
                </div>
              </div>
            )}

          </div>
        ) : (
          <p className="text-center text-lg text-white">Your account is not verified yet. Please contact HR.</p>
        )}
      </div>
    </div>
  );
};

export default WorkSheet;
