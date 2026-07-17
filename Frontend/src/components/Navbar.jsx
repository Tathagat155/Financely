import { useNavigate } from "react-router-dom";

function Navbar({token,setToken}) {
  const navigate=useNavigate();
  
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
            navigate("/");
          }}
        >
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
