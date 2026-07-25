import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
 
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
    </Routes>
  );
}

export default App;