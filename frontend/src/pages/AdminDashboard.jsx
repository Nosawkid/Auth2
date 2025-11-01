import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!auth?.accessToken) return;
      try {
        const res = await axios.get(`/api/users?page=${page}&limit=2`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        });

        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        setError("Fetching Users failed");
        console.log(error);
      }
    };
    fetchUsers();
  }, [auth, page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });

      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError("Deletion Failed");
      console.log(error);
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-6 ${theme === "dark" && "dark"}`}
    >
      <h2 className="text-2xl mb-4 font-bold dark:text-white">
        Admin Dashboard
      </h2>
      {error && <p className="mt-4 text-xl text-red-500">{error}</p>}
      <h3 className="mt-2 text-xl font-semibold mb-4 text-blue-500">
        User Management
      </h3>
      {users?.map((user) => (
        <p key={user._id} className="mb-4 dark:text-white">
          <span>
            {user.username} - {user.email} - {user.role}
          </span>
          {user.role !== "admin" && (
            <button
              onClick={() => handleDelete(user._id)}
              className="inline-block mx-3 bg-linear-to-r from-red-700 to-red-600  text-white p-2 rounded hover:from-red-600 hover:to-red-700"
            >
              Delete User
            </button>
          )}
        </p>
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`px-3 py-1 rounded ${
              page === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            key={index}
            onClick={() => setPage(index + 1)}
          >
            {Number(index + 1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
