import { Navigate, useLocation } from "react-router-dom";
import VerificationModal from "../ui/VerificationModal";

export default function VerificationPending() {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  const handleResend = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/auth/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to resend email.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <VerificationModal
      email={email}
      onResend={handleResend}
    />
  );
}