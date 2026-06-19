import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { TextField } from "../components/TextField";
import { CheckSquare, Loader2 } from "lucide-react";
import { normalizeError } from "../utils/formatError";

export function RegisterPage() {
  const { registerUser, isRegistering, registerError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!name || !email || !password) {
      setValidationError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await registerUser({ name, email, password });
      setIsSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      // Handled globally by TanStack Query
    }
  };

  const errorMessage = normalizeError(registerError) || validationError;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-[#4f46e5] p-2 rounded-xl text-white shadow-sm">
          <CheckSquare className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          Taskr
        </span>
      </div>

      <div className="w-full max-w-110 bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Create account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start managing your tasks today
          </p>
        </div>

        <hr className="border-gray-200 mb-6" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border border-red-100">
              {errorMessage}
            </div>
          )}

          {isSuccess && (
            <div className="bg-green-50 text-green-600 p-3 rounded-xl text-xs font-medium border border-green-100">
              Account created successfully! You can now{" "}
              <a href="/login" className="underline font-bold">
                Sign In
              </a>
              .
            </div>
          )}

          <TextField
            label="Full Name"
            type="text"
            placeholder="Alex Rivera"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isRegistering}
          />

          <TextField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isRegistering}
          />

          <TextField
            label="Password"
            type="password"
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isRegistering}
          />

          <button
            type="submit"
            disabled={isRegistering}
            className="w-full mt-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isRegistering ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#4f46e5] font-semibold hover:underline ml-0.5"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
