import { CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VerifiedModal() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/login", { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Email Verified!
        </h1>

        <p className="mt-3 text-gray-600">
          Your account is now active. You can log in.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Redirecting to login in{" "}
          <span className="font-semibold text-gray-700">{countdown}</span>{" "}
          second{countdown !== 1 && "s"}...
        </p>

        <Link
          to="/login"
          className="mt-8 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}