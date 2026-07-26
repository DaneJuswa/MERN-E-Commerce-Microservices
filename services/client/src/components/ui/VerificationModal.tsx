import { Mail, RefreshCcw, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface VerifyEmailPendingProps {
  email: string;
  onResend: () => void;
}

export default function VerificationModal({
  email,
  onResend,
}: VerifyEmailPendingProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Mail className="h-10 w-10 text-blue-600" />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Check your email
        </h1>

        <p className="mt-3 text-gray-600">
          We've sent a verification link to
        </p>

        <p className="mt-2 font-semibold text-gray-900 break-all">
          {email}
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Click the verification link in your inbox to activate your account.
          After verifying, you'll be able to log in.
        </p>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={onResend}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <RefreshCcw size={18} />
            Resend Verification Email
          </button>

          <Link
            to="/login"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 rounded-lg bg-gray-100 p-4 text-left text-sm text-gray-600">
          <p className="font-medium text-gray-800">
            Didn't receive the email?
          </p>

          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Check your Spam or Junk folder.</li>
            <li>Make sure the email address is correct.</li>
            <li>Click "Resend Verification Email".</li>
          </ul>
        </div>
      </div>
    </div>
  );
}