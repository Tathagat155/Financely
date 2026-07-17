import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AuthPage({setToken}) {
  const [isLogin, setIsLogin] = useState(true);
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submit");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";

      const res = await API.post(endpoint, formData);

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token)
      toast.success(isLogin ? "Login Successful" : "Account Created");

     navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="brand">
        <h1>💰 Financely</h1>
        <p>Track your income and expenses with ease and clarity</p>
      </div>

      <div className="auth-card">
        <h2>{isLogin ? "Log In" : "Create Account"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Log In"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
