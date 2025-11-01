import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useRef } from "react";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const sunRef = useRef(null);
  const moonRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setAuth(null);
      navigate("/login");
    } catch (error) {
      console.log("Logout Failed", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container flex justify-between items-center">
        <Link to={"/"}>Home</Link>
        <div className="flex items-center gap-4">
          {auth?.accessToken ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}
          <p onClick={toggleTheme}>{theme === "light" ? <Moon /> : <Sun />}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
