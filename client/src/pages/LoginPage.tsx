import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { TextField } from "../components/TextField";
import { CheckSquare, Loader2 } from "lucide-react";

export function LoginPage() {
  const { loginUser, isLoggingIn, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!email || !password) {
      setValidationError("Please fill in all fields.");
      return;
    }

    try {
      await loginUser({ email, password });
    } catch (err) {
      // Handled globally by TanStack Query
    }
  };

  const errorMessage =
    (loginError as any)?.response?.data?.error || validationError;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4">
      {/* Logo Head */}
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-[#4f46e5] p-2 rounded-xl text-white shadow-sm">
          <CheckSquare className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          Taskr
        </span>
      </div>

      <div className="w-full max-w-110 bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to your workspace
          </p>
        </div>

        <hr className="border-gray-100 mb-6" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border border-red-100">
              {errorMessage}
            </div>
          )}

          <TextField
            label="Email"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoggingIn}
          />

          <TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
          />

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full mt-2 cursor-pointer bg-[#4f46e5] hover:bg-[#4338ca] text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-[#4f46e5] font-semibold hover:underline ml-0.5"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
