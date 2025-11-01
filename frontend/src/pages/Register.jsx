import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/register", form, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      setError("Login Failed, Please check your credentials");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-l-lg shadow-xl dark:bg-gray-500">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Register</h2>
      {error && (
        <p className="bg-red-200 border text-red-400 font-bold p-3 mb-4">
          {error}
        </p>
      )}
      <form className="space-y-4">
        <div>
          <input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            value={form.username}
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full p-2 border rounded dark:border-white dark:placeholder:text-white"
          />
        </div>
        <div>
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded dark:border-white dark:placeholder:text-white"
          />
        </div>
        <div>
          <input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
            type="password"
            name="password"
            placeholder="*************"
            required
            className="w-full p-2 border rounded dark:border-white dark:placeholder:text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500 w-full"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
