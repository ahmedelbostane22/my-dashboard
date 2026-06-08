import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
function StartPage() {
    const { user } = useAuth();
  return user ? <Navigate to="/home" /> : <Navigate to="/login" />;
}

export default StartPage
