
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Mail, Lock, Eye, EyeOff, Loader2, ShoppingBag,} from "lucide-react";
import { useAuth } from "../context/AuthContext";

import { useCategories } from "../apis/fetchCategroies";

export default function LoginPage() {
  const { categories } = useCategories();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate();
  //login
  const handleLogin = async (e:any) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      

      const res = await fetch("http://localhost:3000/api/auth/login", { 
        method:"POST",
        credentials: "include",
        headers:{"Content-Type": "Application/json"},
        body: JSON.stringify({email, password})
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
      setIsAuthenticated(true)
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
  window.location.href = "http://localhost:3000/api/auth/google";
};

  const handleFacebook = () => {
    window.location.href = "http://localhost:3000/api/auth/facebook";
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-slate-200 p-8">

        {/* Logo */}

        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
            <ShoppingBag size={30} />
          </div>
        </div>

        <h1 className="mt-5 text-center text-3xl font-bold text-slate-800">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Login to continue shopping.
        </p>

        {/* Form */}

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 focus-within:border-blue-600">
              <Mail
                size={18}
                className="text-slate-400"
              />

              <input
                type="email"
                required
                name="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 focus-within:border-blue-600">
              <Lock
                size={18}
                className="text-slate-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                required
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-transparent px-3 py-3 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={20}
                    className="text-slate-400"
                  />
                ) : (
                  <Eye
                    size={20}
                    className="text-slate-400"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Forgot */}

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login */}

          <button
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? (
              <>
                <Loader2
                  className="mr-2 animate-spin"
                  size={20}
                />

                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}

        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-slate-300"></div>

          <span className="mx-4 text-sm text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-300"></div>
        </div>

        {/* Google */}

        <button
          onClick={handleGoogle}
          className="mb-3 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-medium transition hover:bg-slate-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />

          Continue with Google
        </button>

        {/* Facebook */}

        <button
          onClick={handleFacebook}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-medium transition hover:bg-slate-100"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
            alt="Facebook"
            className="h-5 w-5"
          />

          Continue with Facebook
        </button>

        {/* Register */}

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

