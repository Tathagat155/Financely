import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const navigate=useNavigate();
  const { token, setToken } = useAuth();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null)
     navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>💰 Financely</h2>

      {token ? (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button
          className="login-btn"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
