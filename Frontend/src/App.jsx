import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import {useState} from 'react'
function App() {
const [token,setToken]  = useState(localStorage.getItem("token"));
  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <AuthPage setToken={setToken}/>}
      />

      <Route
        path="/dashboard"
        element={<Dashboard token={token} setToken={setToken}/>}
      />
    </Routes>
  );
}

export default App;
