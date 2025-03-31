import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setSelectedUser, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/message/users", {
          withCredentials: true,
        });
        setUsers(response.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5001/user/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user?.fullName?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="h-screen w-80 bg-white text-gray-900 p-5 shadow-lg border-r border-gray-300 backdrop-blur-md flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Users</h2>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <ul className="space-y-3 flex-1 overflow-y-auto scrollbar-thin">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user?._id}
              className={`p-3 rounded-xl shadow-md flex items-center gap-3 cursor-pointer transition 
                ${
                  selectedUser?._id === user._id
                    ? "bg-blue-400 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                {user?.fullName?.[0]?.toUpperCase() || "?"}
              </div>
              <span className="text-lg font-medium">{user?.fullName || "Unknown"}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No users found</p>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
