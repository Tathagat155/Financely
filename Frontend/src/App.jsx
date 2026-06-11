import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import {useState} from 'react'
import { useAuth } from "./context/AuthContext";
function App() {
const { token, setToken } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <AuthPage/>}
      />

      <Route
        path="/dashboard"
        element={<Dashboard/>}
      />
    </Routes>
  );
}

export default App;
