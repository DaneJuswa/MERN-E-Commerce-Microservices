import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import VerificationPending from "./components/ui/VerificationPending";
import VerifiedModal from "./components/ui/VerifiedModal";
import { useAuth } from "./context/AuthContext";

function App() {
  const {isAuthenticated, loading} = useAuth()

  if(loading){
    return <div>Loading....</div>
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <HomePage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/verify-pending" element={<VerificationPending />} />

      <Route path="/email-verified" element={<VerifiedModal />} />
    </Routes>
  );
}

export default App;