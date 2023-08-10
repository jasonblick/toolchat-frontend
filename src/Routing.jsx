// Routing.jsx

import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from './context/AuthContext';
import Dashboard from "./Dashboard";
import Home from "./Home";

export default function Routing() {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      console.log("navigate to dashboard")
      navigate('/dashboard');
    }
  }, [session, navigate]);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

