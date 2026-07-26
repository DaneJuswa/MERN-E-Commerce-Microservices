import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import VerificationPending from "./components/ui/VerificationPending";
import VerifiedModal from "./components/ui/VerifiedModal";

function App() {
  const isAuthenticated = false; // Replace later with JWT auth state

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/verify-pending" element={<VerificationPending />} />

      {/* Success page after email verification */}
      <Route path="/email-verified" element={<VerifiedModal />} />
    </Routes>
  );
}

export default App;