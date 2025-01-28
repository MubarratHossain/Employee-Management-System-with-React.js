import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserTie, FaUserTimes, FaUsersCog } from "react-icons/fa";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToFire, setUserToFire] = useState(null);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://employee-server-smoky.vercel.app/users", {
          withCredentials: true,
        });
        setUsers(response.data.filter(user => user.accountType !== "Admin" && (user.accountType !== "Employee" || user.isVerified)));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleMakeHR = async (id) => {
    try {
      const response = await axios.patch(
        `https://employee-server-smoky.vercel.app/users/employee/${id}`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
      setUsers(prevUsers =>
        prevUsers.map(user => (user._id === id ? { ...user, accountType: "HR" } : user))
      );
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("Failed to promote user");
    }
  };

  const handleFireUser = async (id) => {
    try {
      const response = await axios.patch(
        `https://employee-server-smoky.vercel.app/users/fire/${id}`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
      setUsers(prevUsers =>
        prevUsers.map(user => (user._id === id ? { ...user, accountType: "Fired", isFired: true } : user))
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error firing user:", error);
      alert("Failed to fire user");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Users List</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-purple-500"
        >
          {isGridView ? "Switch to Table View" : "Switch to Card Grid View"}
        </button>
      </div>

      {!isGridView ? (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.accountType === "Fired" ? "Fired" : user.accountType}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {user.accountType === "Employee" && user.isVerified && (
                      <button
                        onClick={() => handleMakeHR(user._id)}
                        className="bg-gradient-to-r from-green-400 to-teal-400 text-white py-1 px-3 rounded-full flex items-center gap-1 hover:from-green-500 hover:to-teal-500"
                      >
                        <FaUsersCog /> Make HR
                      </button>
                    )}
                    {user.accountType !== "Fired" && (
                      <button
                        onClick={() => { setUserToFire(user); setShowModal(true); }}
                        className="bg-gradient-to-r from-red-400 to-pink-400 text-white py-1 px-3 rounded-full flex items-center gap-1 hover:from-red-500 hover:to-pink-500"
                      >
                        <FaUserTimes /> Fire
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <FaUserTie /> {user.username}
              </h2>
              <p className="text-gray-600">Designation: {user.accountType}</p>
              <div className="mt-4 flex justify-between">
                {user.accountType === "Employee" && user.isVerified && (
                  <button
                    onClick={() => handleMakeHR(user._id)}
                    className="bg-gradient-to-r from-green-400 to-teal-400 text-white py-1 px-2 rounded-full flex items-center gap-1 hover:from-green-500 hover:to-teal-500"
                  >
                    <FaUsersCog /> Make HR
                  </button>
                )}
                {user.accountType !== "Fired" && (
                  <button
                    onClick={() => { setUserToFire(user); setShowModal(true); }}
                    className="bg-gradient-to-r from-red-400 to-pink-400 text-white py-1 px-2 rounded-full flex items-center gap-1 hover:from-red-500 hover:to-pink-500"
                  >
                    <FaUserTimes /> Fire
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && userToFire && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Confirm Firing</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to fire {userToFire.username}?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="bg-gray-300 py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button>
              <button onClick={() => handleFireUser(userToFire._id)} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600">Fire</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersList;
